const test = require('tape')
const miniplug = require('./mocks/mp')
const nock = require('nock')('https://plug.dj')

test('Getting rooms by the current user', async (t) => {
  t.plan(2)

  nock.get('/_/rooms/me').reply(200, require('./mocks/rooms/me.json'))

  const rooms = await miniplug().getMyRooms()
  t.equal(rooms.length, 5)
  t.equal(rooms[0].name, '`plug-socket` testing room')
})

test('Sets the current room after joining', async (t) => {
  t.plan(3)

  nock.post('/_/rooms/join').reply(200, require('./mocks/rooms/join.json'))
  nock.get('/_/rooms/state').reply(200, require('./mocks/rooms/state.json'))

  const mp = await miniplug()

  await mp.join('tastycat')
  t.ok(mp.room())
  t.equal(mp.room().slug, 'tastycat')

  t.equal(mp.users().length, 153)
})

test('Emits `roomState` after receiving new room state', async (t) => {
  t.plan(1)

  nock.get('/_/rooms/state').reply(200, require('./mocks/rooms/state.json'))

  const mp = miniplug()
  mp.on('roomState', () => {
    t.pass()
  })
  const state = await mp.getRoomState()
})
