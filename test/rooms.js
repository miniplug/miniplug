const { test } = require('@goto-bus-stop/tape-modern')
const miniplug = require('./mocks/mp')
const nock = require('nock')('https://plug.dj')

test('Getting rooms by the current user', async (t) => {
  nock.get('/_/rooms/me').reply(200, require('./mocks/rooms/me.json'))

  const mp = miniplug()

  const rooms = await mp.getMyRooms()
  t.equal(rooms.length, 5)
  t.equal(rooms[0].name, '`plug-socket` testing room')

  mp.ws.close()
})

test('Sets the current room after joining', async (t) => {
  nock.post('/_/rooms/join').reply(200, require('./mocks/rooms/join.json'))
  nock.get('/_/rooms/state').reply(200, require('./mocks/rooms/state.json'))

  const mp = miniplug()

  await mp.join('tastycat')
  t.ok(mp.room())
  t.equal(mp.room().slug, 'tastycat')

  t.equal(mp.users().length, 153)

  mp.ws.close()
})

test('Emits `roomState` after receiving new room state', async (t) => {
  nock.get('/_/rooms/state').reply(200, require('./mocks/rooms/state.json'))

  const mp = miniplug()
  mp.on('roomState', () => {
    t.pass()
  })
  await mp.getRoomState()

  mp.ws.close()
})

test('Updates `room()` properties when updates come in', async (t) => {
  nock.get('/_/rooms/state').reply(200, require('./mocks/rooms/state.json'))

  const mp = miniplug()
  await mp.getRoomState()

  mp.on('roomDescriptionUpdate', t.pass)
  mp.on('roomWelcomeUpdate', t.pass)
  mp.on('roomNameUpdate', t.pass)
  mp.on('roomMinChatLevelUpdate', t.pass)

  t.ok(/Welcome to the Tastycat room/.test(mp.room().description))

  mp.ws.onmessage({
    data: JSON.stringify([
      {
        a: 'roomDescriptionUpdate',
        p: {
          u: 4393540,
          d: 'New description'
        },
        s: 'tastycat'
      }
    ])
  })
  t.ok(/New description/.test(mp.room().description))

  mp.ws.onmessage({
    data: JSON.stringify([
      { a: 'roomWelcomeUpdate', p: { u: 4393540, w: 'New welcome' }, s: 'tastycat' },
      { a: 'roomNameUpdate', p: { u: 4393540, n: 'room name' }, s: 'tastycat' }
    ])
  })
  mp.ws.onmessage({
    data: JSON.stringify([
      { a: 'roomMinChatLevelUpdate', p: { u: 123456, m: 2 }, s: 'tastycat' }
    ])
  })
  t.equal(mp.room().welcome, 'New welcome')
  t.equal(mp.room().name, 'room name')
  t.equal(mp.room().minChatLevel, 2)

  mp.ws.close()
})
