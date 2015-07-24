import _login from 'plug-login'
import socket from 'plug-socket'
import request from 'request'
import assign from 'object-assign'
import Promise from 'bluebird'
import { EventEmitter as EE } from 'events'

const login = Promise.promisify(_login)

// turns a string of words into an object of { WORD: number }
const enumish = (list, start = 0) => list.split(' ')
  .reduce((o, name, i) => assign(o, { [name]: start + i }), {})

export default function miniplug(opts = {}) {
  let jar = request.jar()
  let mp = new EE()

  let req = request.defaults({
    jar: jar,
    baseUrl: 'https://plug.dj/_/',
    json: true
  })

  // wait until connections are complete before sending off requests
  const _request = (url, opts) => {
    return new Promise((resolve, reject) => {
      mp.onceConnected(() => req(url, opts, (e, resp) => {
        if (e) reject(e)
        else   resolve(resp)
      }))
    })
  }
  const post = (url, data) => _request(url, { method: 'post', body: data })
  const get  = (url, data) => _request(url, { method: 'get', qs: data })
  const put  = (url, data) => _request(url, { method: 'put', body: data })
  const del  = (url, data) => _request(url, { method: 'del', body: data })

  // log in
  let promise = opts.guest? login({ jar, authToken: true })
              : /* else */  login(opts.email, opts.password, { jar, authToken: true })
  promise
    .then(res => {
      let ws = mp.ws = socket(res.token)
      ws.on('error', e => mp.emit('error', e))

      mp.emit('login')

      let me = mp.me()
      ws.once('ack', () => {
        me.then(user => {
          mp.user = user
          mp.emit('connected', user)
        })
      })
    })
    .catch(e => { mp.emit('error', e) })

  mp.on('login', () => {
    mp.connected = true
    mp._queue.forEach(fn => fn())
    mp._queue = []
  })

  // make miniplug!
  return assign(mp, {
    // http yaddayadda
    _jar: jar,
    request: _request,
    post, get, put, del,
    // request timing
    _queue: [],
    onceConnected(fn) {
      if (mp.connected) fn()
      else mp._queue.push(fn)
    },

    // Super-Duper Advanced Plugin API
    use(plugin) {
      plugin(this)
      return this
    },

    // REST APIs
    me() {
      return get('users/me').get('body')
        .get('data').get(0)
    },

    join(slug) {
      return post('rooms/join', { slug: slug }).get('body')
        .then(mp.roomState)
    },
    roomState() {
      return get('rooms/state').get('body')
        .get('data').get(0)
        .tap(state => mp.emit('roomState', state))
    }
  })
}

export const ROLE = assign(enumish('NONE DJ BOUNCER MANAGER COHOST HOST')
                          , { AMBASSADOR: 3, ADMIN: 5 })
export const MEDIA = enumish('YOUTUBE SOUNDCLOUD', 1)
