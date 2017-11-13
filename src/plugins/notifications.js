const kNotifications = Symbol('Notifications')

export default function notificationsPlugin () {
  return (mp) => {
    mp[kNotifications] = []

    function onNotify (notif) {
      mp[kNotifications].push(notif)
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

    function onGift (pp) {
      const me = mp.me()
      if (me) Object.assign(me, { pp })
      mp.emit('gift', { pp })
    }

    mp.on('connected', (user) => {
      mp[kNotifications] = (user && user.notifications) || []

      mp.ws.on('notify', onNotify)
      mp.ws.on('earn', onEarn)
      mp.ws.on('sub', onSub)
      mp.ws.on('gift', onGift)
    })

    Object.assign(mp, {
      notifications: () => mp[kNotifications].map(mp.wrapNotification),

      getNotifications: () =>
        mp.getMe()
          .then((me) => me.notifications || [])
          .tap((notifs) => {
            mp[kNotifications] = notifs
          })
          .map(mp.wrapNotification),

      acknowledgeNotification: (id) =>
        mp.del(`notifications/${id}`).tap(() => {
          // Remove the notification from the local notifications list.
          mp[kNotifications] = mp[kNotifications]
            .filter((notif) => notif.id !== Number(id))
        })
    })
  }
}
