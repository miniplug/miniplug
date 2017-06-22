import login from 'plug-login'
import socket from 'plug-socket'
import createDebug from 'debug'

const debug = createDebug('miniplug:connect')
const debugWs = createDebug('miniplug:ws')

export default function connectPlugin (options = {}) {
  return (mp) => {
    const loginOpts = {
      agent: options.agent,
      host: options.host,
      authToken: true
    }

    function connect (opts) {
      debug('connecting', opts.email)

      const loginPromise = Promise.resolve(
        opts.email
          ? login.user(opts.email, opts.password, loginOpts)
          : login.guest(loginOpts)
      )

      const ws = socket()
      ws.setMaxListeners(100)
      ws.on('action', (type, payload) => {
        debugWs(type, payload)
      })

      const connected = loginPromise
        .then((res) => new Promise((resolve, reject) => {
          ws.auth(res.token)
          ws.once('error', reject)

          mp.isConnected = true
          mp.emit('login')

          const me = mp.getMe()
          ws.once('ack', () => {
            resolve({ cookie: res.cookie })
            ws.removeListener('error', reject)

            me.then((user) => mp.emit('connected', user))
          })
        }))
        .catch((err) => {
          mp.emit('error', err)
          throw err
        })

      mp.ws = ws
      mp.connected = connected

      return connected
    }

    mp.connect = connect
  }
}
