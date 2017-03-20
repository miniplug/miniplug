import { partial } from '../util'
import createDebug from 'debug'
import _wrapWaitlist from '../data/waitlist'

const debug = createDebug('miniplug:waitlist')

export default function waitlistPlugin () {
  const currentWaitlist = Symbol('Waitlist')

  return (mp) => {
    const wrapWaitlist = partial(_wrapWaitlist, mp)

    mp[currentWaitlist] = wrapWaitlist([])

    mp.on('roomState', (state) => {
      mp[currentWaitlist] = wrapWaitlist(state.booth.waitingDJs)
      mp.emit('waitlistUpdate', mp.waitlist(), [])
    })

    function onDjListUpdate (ids) {
      debug('update', ids)

      const previous = mp.waitlist()

      mp[currentWaitlist] = wrapWaitlist(ids)
      mp.emit('waitlistUpdate', mp.waitlist(), previous)
    }

    function onModAddDj () {
      // TODO
    }
    function onModMoveDj () {
      // TODO
    }
    function onModRemoveDj () {
      // TODO
    }

    function onDjListCycle ({ f, mi }) {
      mp.emit('waitlistCycle', {
        shouldCycle: f,
        user: mp.user(mi)
      })
    }

    mp.on('connected', () => {
      mp.ws.on('djListUpdate', onDjListUpdate)
      mp.ws.on('modAddDJ', onModAddDj)
      mp.ws.on('modMoveDJ', onModMoveDj)
      mp.ws.on('modRemoveDJ', onModRemoveDj)
      mp.ws.on('djListCycle', onDjListCycle)
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
