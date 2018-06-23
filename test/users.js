const { test } = require('tape-modern')
const miniplug = require('./mocks/mp')
const nock = require('nock')('https://plug.dj')

test('Retrieving a user', async (t) => {
  nock.get('/_/users/123456').reply(200, require('./mocks/users/123456.json'))

  const mp = miniplug()

  const user = await mp.getUser(123456)
  t.equal(user.username, 'Username')

  mp.ws.close()
})

test('Get the current user', async (t) => {
  nock.get('/_/users/me').reply(200, require('./mocks/users/me.json'))

  const mp = miniplug()

  const user = await mp.getMe()
  t.equal(user.username, 'ReAnna')

  mp.ws.close()
})

test('Get a user who is currently in the room', async (t) => {
  nock.post('/_/rooms/join').reply(200, require('./mocks/rooms/join.json'))
  nock.get('/_/rooms/state').reply(200, require('./mocks/rooms/state.json'))

  const mp = miniplug()
  await mp.join('tastycat')

  mp.emit('connected', {
    id: 555555
  })

  t.ok(mp.user(4103894), 'should return user who is in the room')
  t.notOk(mp.user(123456), 'should not return user who is not in the room')
  t.ok(mp.user(555555), 'should get the current user, issue #35')

  t.ok(mp.userByName('Tastybot'), 'should find users by their name')
  t.notOk(mp.userByName('tastybot'), 'should treat usernames case sensitively')

  mp.ws.close()
})
