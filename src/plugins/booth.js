import partial from 'lodash-es/partial'

export default function booth (opts = {}) {
  const currentHistoryEntry = Symbol('History entry')

  return (mp) => {
    // Local state API
    const historyEntry = () => mp[currentHistoryEntry]
    const dj = () => mp[currentHistoryEntry] ? mp[currentHistoryEntry].dj : null
    const media = () => mp[currentHistoryEntry] ? mp[currentHistoryEntry].media : null

    mp.on('roomState', (state) => {
      mp[currentHistoryEntry] = {
        id: state.playback.historyID,
        dj: mp.user(state.booth.currentDJ),
        media: state.playback.media,
        playlistId: state.playback.playlistID,
        time: new Date(`${state.playback.startTime} UTC`)
      }
    })

    // Socket API
    mp.on('login', () => {
      mp.ws.on('advance', e => {
        const previous = historyEntry()
        if (!e || !e.m) {
          mp.emit('advance', null, previous)
          return
        }
        let {
          h: historyId,
          m: media,
          c: djId,
          p: playlistId,
          t: time
        } = e

        time = new Date(`${time} UTC`)

        mp[currentHistoryEntry] = {
          id: historyId,
          dj: mp.user(djId),
          media: media,
          playlistId: playlistId,
          time: time
        }

        mp.emit('advance', historyEntry(), previous)
      })
    })

    // Rest API
    Object.assign(mp, {
      skipDJ: (uid, hid) =>
        mp.post('booth/skip', { userID: uid, historyID: hid }),
      skipMe: partial(mp.post, 'booth/skip/me')
    })

    Object.assign(mp, {
      historyEntry,
      dj,
      media
    })
  }
}
