import partial from 'lodash-es/partial'
import remove from 'lodash-es/remove'
import _wrapNotification from '../data/notification'

export default function notificationsPlugin () {
  const currentNotifications = Symbol('Notifications')

  return (mp) => {
    const wrapNotification = partial(_wrapNotification, mp)

    mp[currentNotifications] = []

    mp.on('connected', (user) => {
      mp[currentNotifications] = user && user.notifications || []
    })

    mp.ws.on('notify', (notif) => {
      mp[currentNotifications].push(notif)
      mp.emit('notify', wrapNotification(notif))
    })

    Object.assign(mp, {
      notifications: () => mp[currentNotifications].map(wrapNotification),

      getNotifications: () =>
        mp.getMe()
          .then((me) => me.notifications || [])
          .tap((notifs) => {
            mp[currentNotifications] = notifs
          })
          .map(wrapNotification),

      acknowledgeNotification: (id) =>
        mp.del(`notifications/${id}`).tap(() =>
          remove(mp[currentNotifications], { id: Number(id) })
        )
    })
  }
}
