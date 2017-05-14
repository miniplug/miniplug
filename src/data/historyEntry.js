import makeProto from '../wrap'
import { partial, parseDate } from '../util'

export default function wrapHistoryEntry (mp, raw, user) {
  const entry = {
    id: raw.id,
    // wrapMedia expects a playlist ID, but we don't know it--pass null instead.
    media: mp.wrapMedia(null, raw.media),
    room: mp.wrapRoom(raw.room),
    user: raw.user ? mp.wrapUser(raw.user) : null,
    time: parseDate(raw.timestamp),
    score: raw.score
  }

  return makeProto(entry, {
    getUser: partial(mp.getUser, raw.user.id)
  })
}
