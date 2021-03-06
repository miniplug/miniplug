import { partial } from '../util.js'
import { BAN_DURATION, BAN_REASON } from '../constants.js'

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

    function onBan (ref) {
      mp.emit('ban', {
        duration: ref.d,
        reason: ref.r
      })
    }

    function onModBan (ref) {
      mp.emit('modBan', {
        moderator: mp.user(ref.mi) || mp.wrapUser({ id: ref.mi }),
        username: ref.t,
        duration: ref.d
      })
    }

    mp.on('connected', (user) => {
      mp.ws.on('ban', onBan)
      mp.ws.on('modBan', onModBan)
    })
  }
}
