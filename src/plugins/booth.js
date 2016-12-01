import partial from 'lodash-es/partial'

export default function booth (opts = {}) {
  return (mp) => {
    // Local state API
    const historyEntry = () => mp._historyEntry
    const dj = () => mp._historyEntry ? mp._historyEntry.dj : null
    const media = () => mp._historyEntry ? mp._historyEntry.media : null

    mp.on('roomState', (state) => {
      mp._historyEntry = {
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

        mp._historyEntry = {
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
      joinWaitlist: partial(mp.post, 'booth'),
      leaveWaitlist: partial(mp.del, 'booth'),
      setCycle: (val = true) =>
        mp.put('booth/cycle', { shouldCycle: val }),
      enableCycle: () =>
        mp.setCycle(true),
      disableCycle: () =>
        mp.setCycle(false),
      setLock: (locked = true, clear = false) =>
        mp.put('booth/lock', { isLocked: locked, removeAllDJs: clear }),
      lockWaitlist: (clear = false) =>
        mp.setLock(true, clear),
      unlockWaitlist: () =>
        mp.setLock(false, false),
      addDJ: (uid) =>
        mp.post('booth/add', { id: uid }),
      moveDJ: (uid, pos) =>
        mp.post('booth/move', { userID: uid, position: pos }),
      removeDJ: (uid) =>
        mp.del(`booth/remove/${uid}`),
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
