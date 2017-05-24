const test = require('tape')
const miniplug = require('./mocks/mp')
const nock = require('nock')('https://plug.dj')

test('Retrieving a user', async (t) => {
  t.plan(1)

  nock.get('/_/users/123456').reply(200, require('./mocks/users/123456.json'))

  const user = await miniplug().getUser(123456)
  t.equal(user.username, 'Username')
})

test('Get the current user', async (t) => {
  t.plan(1)

  nock.get('/_/users/me').reply(200, require('./mocks/users/me.json'))

  const user = await miniplug().getMe()
  t.equal(user.username, 'ReAnna')
})

test('Get a user who is currently in the room', async (t) => {
  t.plan(5)

  nock.post('/_/rooms/join').reply(200, require('./mocks/rooms/join.json'))
  nock.get('/_/rooms/state').reply(200, require('./mocks/rooms/state.json'))

  const mp = await miniplug()
  await mp.join('tastycat')

  mp.emit('connected', {
    id: 555555
  })

  t.ok(mp.user(4103894), 'should return user who is in the room')
  t.notok(mp.user(123456), 'should not return user who is not in the room')
  t.ok(mp.user(555555), 'should get the current user, issue #35')

  t.ok(mp.userByName('Tastybot'), 'should find users by their name')
  t.notok(mp.userByName('tastybot'), 'should treat usernames case sensitively')
})
