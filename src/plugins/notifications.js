import { partial } from 'ap'
import _wrapNotification from '../data/notification'

export default function notificationsPlugin () {
  const currentNotifications = Symbol('Notifications')

  return (mp) => {
    const wrapNotification = partial(_wrapNotification, mp)

    mp[currentNotifications] = []

    function onNotify (notif) {
      mp[currentNotifications].push(notif)
      mp.emit('notify', wrapNotification(notif))
    }

    mp.on('connected', (user) => {
      mp[currentNotifications] = user && user.notifications || []

      mp.ws.on('notify', onNotify)
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
        mp.del(`notifications/${id}`).tap(() => {
          // Remove the notification from the local notifications list.
          mp[currentNotifications] = mp[currentNotifications]
            .filter((notif) => notif.id !== Number(id))
        })
    })
  }
}
