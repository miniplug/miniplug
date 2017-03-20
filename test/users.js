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
