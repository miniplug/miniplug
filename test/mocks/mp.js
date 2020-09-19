import Promise from 'bluebirdish'
import miniplug from 'miniplug'
import socket from './socket.cjs'

export default function mockMiniplug () {
  const mp = miniplug()

  mp.ws = socket()

  mp.connected = Promise.resolve({
    cookie: 'Fake Cookie'
  })

  // TODO make this configurable by the calling test
  mp.emit('connected', { id: 123456, guest: true })

  return mp
}
