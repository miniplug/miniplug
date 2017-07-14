import { WAITLIST_BAN_DURATION, WAITLIST_BAN_REASON } from '../constants'

export default function waitlistBansPlugin () {
  return (mp) => {
    const getWaitlistBans = () =>
      mp.get('booth/waitlistban').map(mp.wrapWaitlistBan)
    const waitlistBan = (id, duration = WAITLIST_BAN_DURATION.SHORT, reason = WAITLIST_BAN_REASON.SPAMMING) =>
      mp.post('booth/waitlistban', {
        userID: id,
        duration,
        reason
      })
    const waitlistUnban = (id) =>
      mp.del(`booth/waitlistban/${id}`)

    mp.on('connected', () => {
      mp.ws.on('modWaitlistBan', (ban) => {
        mp.emit('waitlistBan', mp.wrapWaitlistBan({
          moderator: ban.m,
          moderatorID: ban.mi,
          username: ban.t,
          id: ban.ti,
          duration: ban.d,
          reason: null,
          timestamp: new Date()
        }))
      })
    })

    Object.assign(mp, {
      getWaitlistBans,
      waitlistBan,
      waitlistUnban
    })
  }
}
