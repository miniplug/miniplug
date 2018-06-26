import makeProto from '../wrap'
import { partial, parseDate } from '../util'

export default function wrapHistoryEntry (mp, rawEntry) {
  const timestamp = parseDate(rawEntry.timestamp)

  rawEntry.timestamp = timestamp
  // wrapMedia expects a playlist ID, but we don't know it--pass null instead.
  rawEntry.media = mp.wrapMedia(null, rawEntry.media)
  rawEntry.user = mp.wrapUser(rawEntry.user)

  if (rawEntry.room) {
    rawEntry.room = mp.wrapRoom(rawEntry.room)
  }

  return makeProto(rawEntry, {
    get time () { throw new Error('miniplug: \'HistoryEntry.time\' was renamed to \'HistoryEntry.timestamp\' in v2.0.0. Please update your code.') },
    get dj () { throw new Error('miniplug: \'HistoryEntry.dj\' was renamed to \'HistoryEntry.user\' in v2.0.0. Please update your code.') },
    getUser: partial(mp.getUser, rawEntry.user.id),
    skip: partial(mp.skipDJ, rawEntry.user.id, rawEntry.id)
  })
}
