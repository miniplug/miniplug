import { partial, parseDate } from '../util'

export default function boothPlugin (opts = {}) {
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
        time: parseDate(state.playback.startTime)
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
        user: mp.user(djId) || mp.wrapUser({ id: djId }),
        media: media,
        playlistId: playlistId,
        time: time
      }
      // Compat with v1.7.0 and below.
      // TODO remove in 2.x
      mp[currentHistoryEntry].dj = mp[currentHistoryEntry].user

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
