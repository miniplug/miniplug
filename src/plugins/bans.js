import { partial } from '../util'
import { BAN_DURATION, BAN_REASON } from '../constants'

export default function bansPlugin () {
  return (mp) => {
    const getBans = partial(mp.get, 'bans')
    const ban = (uid, duration = BAN_DURATION.HOUR, reason = BAN_REASON.SPAMMING) =>
      mp.post('bans/add', {
        userID: uid,
        reason: reason,
        duration: duration
      }).get(0)
    const unban = (uid) =>
      mp.del(`bans/${uid}`)

    Object.assign(mp, {
      getBans,
      ban,
      unban
    })
  }
}
