import { test } from '@goto-bus-stop/tape-modern'
import createNock from 'nock'
import miniplug from './mocks/mp.js'

const nock = createNock('https://plug.dj')

test('check waitlist lock/cycle state', async (t) => {
  nock.get('/_/rooms/state').replyWithFile(200, new URL('./mocks/rooms/state.json', import.meta.url))

  const mp = miniplug()

  await mp.getRoomState()
  t.equal(mp.isLocked(), false)
  t.equal(mp.isCycling(), false)

  mp.ws.receiveMessages([
    { a: 'djListCycle', p: { m: 'ReAnna', mi: 4393540, f: true }, s: 'reanna' },
    { a: 'djListLocked', p: { m: 'ReAnna', c: false, mi: 4393540, f: true }, s: 'reanna' }
  ])

  t.equal(mp.isLocked(), true)
  t.equal(mp.isCycling(), true)

  mp.ws.close()
})
