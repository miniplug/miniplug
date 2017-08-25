import { unescape } from 'plug-message-split'
import { partial, parseDate } from '../util'
import makeProto from '../wrap'

export default function wrapWaitlistBan (mp, data) {
  data.username = unescape(data.username)
  data.moderator = unescape(data.moderator)

  const ban = {
    user: mp.user(data.id) || mp.wrapUser({ id: data.id, username: data.username }),
    moderator: mp.user(data.moderatorID) || mp.userByName(data.moderator) || 
      mp.wrapUser({ id: data.moderatorID, username: data.moderator }),
    moderatorName: data.moderator,
    reason: data.reason,
    duration: data.duration,
    timestamp: typeof data.timestamp === 'string'
      ? parseDate(data.timestamp)
      : data.timestamp
  }
  return makeProto(ban, {
    getUser: partial(mp.getUser, data.id),
    remove: partial(mp.waitlistUnban, data.id)
  })
}
