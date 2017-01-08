import partial from 'lodash-es/partial'

export default function votePlugin (opts = {}) {
  const currentVoteStats = Symbol('Votes')
  const currentGrabs = Symbol('Grabs')

  return function (mp) {
    mp[currentVoteStats] = []
    mp[currentGrabs] = []

    mp.on('advance', () => {
      mp[currentVoteStats] = []
      mp[currentGrabs] = []
    })

    mp.on('login', () => {
      mp.ws.on('vote', ({ i, v }) => {
        mp[currentVoteStats].push({
          uid: i,
          vote: v
        })
        const user = mp.user(i)
        mp.emit('vote', {
          user,
          vote: v
        })
      })
      mp.ws.on('grab', (uid) => {
        mp[currentGrabs].push(uid)
        const user = mp.user(uid)
        mp.emit('grab', user)
      })
    })

    mp.on('roomState', (state) => {
      mp[currentGrabs] = Object.keys(state.grabs)
      mp[currentVoteStats] = Object.keys(state.votes).map((uid) => ({
        uid,
        vote: state.votes[uid]
      }))
    })

    mp.score = () => {
      const map = mp[currentVoteStats].reduce(
        (map, v) => Object.assign(map, { [v.uid]: v.vote }),
        {}
      )
      let positive = 0
      let negative = 0
      Object.keys(map).forEach((uid) => {
        if (map[uid] === 1) {
          positive++
        } else if (map[uid] === -1) {
          negative++
        }
      })
      return {
        positive,
        negative,
        grabs: mp[currentGrabs].length,
        listeners: mp.users().length + mp.guests()
      }
    }

    Object.assign(mp, {
      grab: (targetPlaylist, hid) =>
        mp.post('grabs', { playlistID: targetPlaylist, historyID: hid }).get(0),

      vote: (direction) =>
        mp.post('votes', {
          historyID: mp.historyEntry().id,
          direction: direction
        }),

      woot: partial(mp.vote, 1),
      meh: partial(mp.vote, -1)
    })
  }
}
