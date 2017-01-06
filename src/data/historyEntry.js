import partial from 'lodash-es/partial'
import makeProto from '../wrap'
import wrapMedia from './media'
import wrapRoom from './room'
import wrapUser from './user'

export default function wrapHistoryEntry (mp, raw) {
  const entry = {
    id: raw.id,
    // wrapMedia expects a playlist ID, but we don't know it--pass null instead.
    media: wrapMedia(mp, null, raw),
    room: wrapRoom(mp, raw.room),
    user: wrapUser(mp, raw.user),
    time: new Date(`${raw.timestamp} UTC`),
    score: raw.score
  }

  return makeProto(entry, {
    getUser: partial(mp.getUser, raw.user.id)
  })
}
