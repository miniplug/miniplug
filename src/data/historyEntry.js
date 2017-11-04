import makeProto from '../wrap'
import { partial, parseDate } from '../util'

export default function wrapHistoryEntry (mp, raw) {
  const timestamp = parseDate(raw.timestamp)
  const entry = {
    id: raw.id,
    // wrapMedia expects a playlist ID, but we don't know it--pass null instead.
    media: mp.wrapMedia(null, raw.media),
    room: mp.wrapRoom(raw.room),
    user: mp.wrapUser(raw.user),
    time: timestamp, // TODO(v2.x) remove this alias
    timestamp: timestamp,
    score: raw.score
  }

  return makeProto(entry, {
    getUser: partial(mp.getUser, raw.user.id),
    skip: partial(mp.skipDJ, raw.user.id, raw.id)
  })
}
