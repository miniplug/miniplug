import { partial } from '../util'
import createDebug from 'debug'

const debug = createDebug('miniplug:waitlist')
const kWaitlist = Symbol('Waitlist')
const kLocked = Symbol('Waitlist locked')
const kCycles = Symbol('Waitlist cycles')

export default function waitlistPlugin () {
  return (mp) => {
    mp[kLocked] = false
    mp[kCycles] = true
    mp[kWaitlist] = mp.wrapWaitlist([])

    mp.on('roomState', (state) => {
      mp[kWaitlist] = mp.wrapWaitlist(state.booth.waitingDJs)
      mp[kLocked] = state.booth.isLocked
      mp[kCycles] = state.booth.shouldCycle
      mp.emit('waitlistUpdate', mp.waitlist(), [])
    })

    function onDjListUpdate (ids) {
      debug('update', ids)

      const previous = mp.waitlist()

      mp[kWaitlist] = mp.wrapWaitlist(ids)
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
        moderator: mp.user(ref.mi) || mp.wrapUser({ id: ref.mi, username: ref.m }),
        username: ref.t
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

    function onModSkip (ref) {
      mp.emit('modSkip', mp.user(ref.mi) || mp.wrapUser({ id: ref.mi, username: ref.m }))
    }

    function onDjListCycle ({ f, mi }) {
      mp[kCycles] = f

      mp.emit('waitlistCycle', {
        shouldCycle: f,
        user: mp.user(mi) || mp.wrapUser({ id: mi })
      })
    }

    function onDjListLocked ({ f, c, mi }) {
      mp[kLocked] = f

      const user = mp.user(mi) || mp.wrapUser({ id: mi })
      mp.emit('waitlistLock', {
        locked: f,
        cleared: !!c,
        user
      })

      if (c) {
        mp.emit('waitlistClear', { user })
      }
    }

    function onSkip (ref) {
      mp.emit('skip', mp.user(ref) || mp.wrapUser({ id: ref }))
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
      mp.ws.on('skip', onSkip)
    })

    const setCycle = (val = true) =>
      mp.put('booth/cycle', { shouldCycle: val })

    Object.assign(mp, {
      waitlist: () => mp[kWaitlist],

      joinWaitlist: partial(mp.post, 'booth'),
      leaveWaitlist: partial(mp.del, 'booth'),

      isCycling: () => mp[kCycles],
      setCycle,
      enableCycle: partial(setCycle, true),
      disableCycle: partial(setCycle, false),

      isLocked: () => mp[kLocked],
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
