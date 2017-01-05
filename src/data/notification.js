import partial from 'lodash-es/partial'
import makeProto from '../wrap'

export default function wrapNotification (mp, notif) {
  notif.id = Number(notif.id)
  notif.timestamp = new Date(`${notif.timestamp} UTC`)

  return makeProto(notif, {
    acknowledge: partial(mp.acknowledgeNotification, notif.id)
  })
}
