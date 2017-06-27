export default function notificationsPlugin () {
  const currentNotifications = Symbol('Notifications')

  return (mp) => {
    mp[currentNotifications] = []

    function onNotify (notif) {
      mp[currentNotifications].push(notif)
      mp.emit('notify', mp.wrapNotification(notif))
    }

    function onEarn (ref) {
      const me = mp.me()
      if (me) Object.assign(me, ref)
      mp.emit('earn', {
        xp: ref.xp,
        pp: ref.pp,
        level: ref.level
      })
    }

    function onSub (sub) {
      const me = mp.me()
      if (me) me.sub = sub
      mp.emit('sub', sub)
    }

    mp.on('connected', (user) => {
      mp[currentNotifications] = (user && user.notifications) || []

      mp.ws.on('notify', onNotify)
      mp.ws.on('earn', onEarn)
      mp.ws.on('sub', onSub)
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
