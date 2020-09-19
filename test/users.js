import { test } from '@goto-bus-stop/tape-modern'
import createNock from 'nock'
import miniplug from './mocks/mp.js'

const nock = createNock('https://plug.dj')

test('Retrieving a user', async (t) => {
  nock.get('/_/users/123456').replyWithFile(200, new URL('./mocks/users/123456.json', import.meta.url))

  const mp = miniplug()

  const user = await mp.getUser(123456)
  t.equal(user.username, 'Username')

  mp.ws.close()
})

test('Get the current user', async (t) => {
  nock.get('/_/users/me').replyWithFile(200, new URL('./mocks/users/me.json', import.meta.url))

  const mp = miniplug()

  const user = await mp.getMe()
  t.equal(user.username, 'ReAnna')

  mp.ws.close()
})

test('Get a user who is currently in the room', async (t) => {
  nock.post('/_/rooms/join').replyWithFile(200, new URL('./mocks/rooms/join.json', import.meta.url))
  nock.get('/_/rooms/state').replyWithFile(200, new URL('./mocks/rooms/state.json', import.meta.url))

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
