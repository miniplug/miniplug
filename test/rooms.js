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
