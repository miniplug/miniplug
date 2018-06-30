import { partial, parseDate } from '../util'

const kCurrentHistoryEntry = Symbol('History entry')

export default function boothPlugin (opts = {}) {
  return (mp) => {
    // Local state API
    const historyEntry = () => mp[kCurrentHistoryEntry]
    const dj = () => mp[kCurrentHistoryEntry] ? mp[kCurrentHistoryEntry].user : null
    const media = () => mp[kCurrentHistoryEntry] ? mp[kCurrentHistoryEntry].media : null

    mp.on('roomState', (state) => {
      if (!state.playback.media) {
        mp[kCurrentHistoryEntry] = null
        return
      }

      const timestamp = parseDate(state.playback.startTime)

      mp[kCurrentHistoryEntry] = mp.wrapHistoryEntry({
        id: state.playback.historyID,
        user: mp.user(state.booth.currentDJ),
        media: state.playback.media,
        timestamp: timestamp
      })

      // only for the current historyEntry
      mp[kCurrentHistoryEntry].playlistId = state.playback.playlistID
    })

    // Socket API
    function onAdvance (event) {
      const previous = historyEntry()
      if (!event || !event.m) {
        mp[kCurrentHistoryEntry] = null
        mp.emit('advance', null, previous)
        return
      }

      let {
        h: historyId,
        m: media,
        c: djId,
        p: playlistId,
        t: timestamp
      } = event

      mp[kCurrentHistoryEntry] = mp.wrapHistoryEntry({
        id: historyId,
        user: mp.user(djId) || mp.wrapUser({ id: djId }),
        media: media,
        timestamp: timestamp
      })

      // only for the current historyEntry
      mp[kCurrentHistoryEntry].playlistId = playlistId

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
