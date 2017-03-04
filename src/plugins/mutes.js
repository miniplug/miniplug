import { partial } from 'ap'
import { MUTE_DURATION, MUTE_REASON } from '../constants'

export default function mutesPlugin () {
  return (mp) => {
    const getMutes = partial(mp.get, 'mutes')
    const mute = (uid, duration = MUTE_DURATION.SHORT, reason = MUTE_REASON.VIOLATING_RULES) =>
      mp.post('mutes', {
        userID: uid,
        duration: duration,
        reason: reason
      })
    const unmute = (uid) =>
      mp.del(`mutes/${uid}`)

    Object.assign(mp, {
      getMutes,
      mute,
      unmute
    })
  }
}
