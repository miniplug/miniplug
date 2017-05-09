import { partial, parseDate } from '../util'

export default function boothPlugin (opts = {}) {
  const currentHistoryEntry = Symbol('History entry')

  return (mp) => {
    // Local state API
    const historyEntry = () => mp[currentHistoryEntry]
    const dj = () => mp[currentHistoryEntry] ? mp[currentHistoryEntry].dj : null
    const media = () => mp[currentHistoryEntry] ? mp[currentHistoryEntry].media : null

    mp.on('roomState', (state) => {
      const timestamp = parseDate(state.playback.startTime)
      mp[currentHistoryEntry] = {
        id: state.playback.historyID,
        dj: mp.user(state.booth.currentDJ),
        media: state.playback.media,
        playlistId: state.playback.playlistID,
        time: timestamp, // TODO(v2.x) remove this alias
        timestamp: timestamp
      }
    })

    // Socket API
    function onAdvance (event) {
      const previous = historyEntry()
      if (!event || !event.m) {
        mp[currentHistoryEntry] = null
        mp.emit('advance', null, previous)
        return
      }

      let {
        h: historyId,
        m: media,
        c: djId,
        p: playlistId,
        t: time
      } = event

      time = parseDate(time)

      mp[currentHistoryEntry] = {
        id: historyId,
        dj: mp.user(djId) || mp.wrapUser({ id: djId }),
        media: media,
        playlistId: playlistId,
        time: time, // TODO(v2.x) remove this alias
        timestamp: time
      }

      mp.emit('advance', historyEntry(), previous)
    }

    mp.on('connected', () => {
      mp.ws.on('advance', onAdvance)
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
