import partial from 'lodash-es/partial'
import makeProto from '../wrap'
import { parseDate } from '../util'

export default function wrapNotification (mp, notif) {
  notif.id = Number(notif.id)
  notif.timestamp = parseDate(notif.timestamp)

  if (notif.action === 'levelUp') {
    notif.level = Number(notif.value)
  }

  if (notif.action === 'gift') {
    const parts = notif.value.split('\u2800')
    notif.from = parts[0]
    notif.amount = Number(parts[1])
  }

  if (notif.action === 'custom') {
    notif.message = notif.value
  }

  return makeProto(notif, {
    acknowledge: partial(mp.acknowledgeNotification, notif.id)
  })
}
