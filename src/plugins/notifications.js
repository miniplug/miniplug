export default function notificationsPlugin () {
  const currentNotifications = Symbol('Notifications')

  return (mp) => {
    mp[currentNotifications] = []

    function onNotify (notif) {
      mp[currentNotifications].push(notif)
      mp.emit('notify', mp.wrapNotification(notif))
    }

    mp.on('connected', (user) => {
      mp[currentNotifications] = (user && user.notifications) || []

      mp.ws.on('notify', onNotify)
    })

    Object.assign(mp, {
      notifications: () => mp[currentNotifications].map(mp.wrapNotification),

      getNotifications: () =>
        mp.getMe()
          .then((me) => me.notifications || [])
          .tap((notifs) => {
            mp[currentNotifications] = notifs
          })
          .map(mp.wrapNotification),

      acknowledgeNotification: (id) =>
        mp.del(`notifications/${id}`).tap(() => {
          // Remove the notification from the local notifications list.
          mp[currentNotifications] = mp[currentNotifications]
            .filter((notif) => notif.id !== Number(id))
        })
    })
  }
}
