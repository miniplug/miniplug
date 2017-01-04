import partial from 'lodash-es/partial'
import createDebug from 'debug'
import _wrapWaitlist from '../data/waitlist'

const debug = createDebug('miniplug:waitlist')

export default function waitlist () {
  const currentWaitlist = Symbol('Waitlist')

  return (mp) => {
    const wrapWaitlist = partial(_wrapWaitlist, mp)

    mp[currentWaitlist] = wrapWaitlist([])

    mp.on('roomState', (state) => {
      mp[currentWaitlist] = wrapWaitlist(state.booth.waitingDJs)
      mp.emit('waitlistUpdate', mp.waitlist(), [])
    })
    mp.ws.on('djListUpdate', (ids) => {
      debug('update', ids)

      const previous = mp.waitlist()

      mp[currentWaitlist] = wrapWaitlist(ids)
      mp.emit('waitlistUpdate', mp.waitlist(), previous)
    })

    mp.ws.on('modAddDJ', () => {
      // TODO
    })
    mp.ws.on('modMoveDJ', () => {
      // TODO
    })
    mp.ws.on('modRemoveDJ', () => {
      // TODO
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
