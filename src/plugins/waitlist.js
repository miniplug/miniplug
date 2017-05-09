import { partial } from '../util'
import createDebug from 'debug'

const debug = createDebug('miniplug:waitlist')

export default function waitlistPlugin () {
  const currentWaitlist = Symbol('Waitlist')

  return (mp) => {
    mp[currentWaitlist] = mp.wrapWaitlist([])

    mp.on('roomState', (state) => {
      mp[currentWaitlist] = mp.wrapWaitlist(state.booth.waitingDJs)
      mp.emit('waitlistUpdate', mp.waitlist(), [])
    })

    function onDjListUpdate (ids) {
      debug('update', ids)

      const previous = mp.waitlist()

      mp[currentWaitlist] = mp.wrapWaitlist(ids)
      mp.emit('waitlistUpdate', mp.waitlist(), previous)
    }

    function onAdvance (event) {
      if (event && event.d) {
        onDjListUpdate(event.d)
      } else {
        onDjListUpdate([])
      }
    }

    function onModAddDj (ref) {
      mp.emit('modAddDj', {
        moderator: mp.user(ref.mi) || mp.wrapUser({ id: ref.mi }),
        username: ref.t,
        cycle: ref.m
      })
    }

    function onModMoveDj (ref) {
      mp.emit('modMoveDj', {
        moderator: mp.user(ref.mi) || mp.wrapUser({ id: ref.mi }),
        username: ref.u,
        movedFrom: ref.o,
        movedTo: ref.n
      })
    }

    function onModRemoveDj (ref) {
      mp.emit('modRemoveDj', {
        moderator: mp.user(ref.mi) || mp.wrapUser({ id: ref.mi }),
        username: ref.t,
        inBooth: ref.d
      })
    }

    function onModSkip(ref) {
      mp.emit('modSkip', mp.user(ref.mi) || mp.wrapUser({ id: ref.mi, username: ref.m }))
    }

    function onDjListCycle ({ f, mi }) {
      mp.emit('waitlistCycle', {
        shouldCycle: f,
        user: mp.user(mi)
      })
    }

    function onDjListLocked ({ f, c, mi }) {
      const user = mp.user(mi)
      mp.emit('waitlistLock', {
        locked: f,
        cleared: !!c,
        user
      })

      if (c) {
        mp.emit('waitlistClear', { user })
      }
    }

    mp.on('connected', () => {
      mp.ws.on('djListUpdate', onDjListUpdate)
      mp.ws.on('advance', onAdvance)
      mp.ws.on('modAddDJ', onModAddDj)
      mp.ws.on('modMoveDJ', onModMoveDj)
      mp.ws.on('modRemoveDJ', onModRemoveDj)
      mp.ws.on('modSkip', onModSkip)
      mp.ws.on('djListCycle', onDjListCycle)
      mp.ws.on('djListLocked', onDjListLocked)
    })

    const setCycle = (val = true) =>
      mp.put('booth/cycle', { shouldCycle: val })

    Object.assign(mp, {
      waitlist: () => mp[currentWaitlist],

      joinWaitlist: partial(mp.post, 'booth'),
      leaveWaitlist: partial(mp.del, 'booth'),

      setCycle,
      enableCycle: partial(setCycle, true),
      disableCycle: partial(setCycle, false),

      setLock: (locked = true, clear = false) =>
        mp.put('booth/lock', { isLocked: locked, removeAllDJs: clear }),
      lockWaitlist: (clear = false) =>
        mp.setLock(true, clear),
      unlockWaitlist: () =>
        mp.setLock(false, false),

      addDJ: (uid) =>
        mp.post('booth/add', { id: uid }),
      moveDJ: (uid, pos) =>
        mp.post('booth/move', { userID: uid, position: pos }),
      removeDJ: (uid) =>
        mp.del(`booth/remove/${uid}`)
    })
  }
}
