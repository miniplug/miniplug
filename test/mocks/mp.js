const EventEmitter = require('events')
const Promise = require('bluebirdish')
const miniplug = require('../../')
const socket = require('proxyquire')('plug-socket', {
  // A not-WebSocket that is a good enough imitation for plug-socket
  ws: function WebSocket () {
    const fakeSocket = new EventEmitter()
    setImmediate(() => {
      fakeSocket.onopen && fakeSocket.onopen()
    })

    // Adding a thing so tests can mock socket events more easily
    fakeSocket.receiveMessages = (messages) => {
      fakeSocket.onmessage({
        data: JSON.stringify(messages)
      })
    }

    fakeSocket.close = () => {
      setImmediate(() => {
        fakeSocket.onclose && fakeSocket.onclose()
        fakeSocket.emit('close')
      })
    }

    return fakeSocket
  }
})

module.exports = () => {
  const mp = miniplug()

  mp.ws = socket()

  mp.connected = Promise.resolve({
    cookie: 'Fake Cookie'
  })

  // TODO make this configurable by the calling test
  mp.emit('connected', { id: 123456, guest: true })

  return mp
}
