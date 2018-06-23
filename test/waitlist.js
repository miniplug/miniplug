const { test } = require('tape-modern')
const miniplug = require('./mocks/mp')
const nock = require('nock')('https://plug.dj')

test('check waitlist lock/cycle state', async (t) => {
  nock.get('/_/rooms/state').reply(200, require('./mocks/rooms/state.json'))

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
