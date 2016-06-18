import _login from 'plug-login'
import socket from 'plug-socket'
import request from 'request'
import assign from 'object-assign'
import flatten from 'flatten'
import partial from 'lodash.partial'
import Promise from 'bluebird'
import { EventEmitter as EE } from 'events'
import { stringify as stringifyQS } from 'querystring'

import { BAN_DURATION
       , BAN_REASON
       , MUTE_DURATION
       , MUTE_REASON } from './constants'

const login = Promise.promisify(_login)
const debug = require('debug')('miniplug:miniplug')
const defaultOptions = {
  host: 'https://plug.dj'
}

export default function miniplug(opts = {}) {
  let jar = request.jar()
  let mp = new EE()

  opts = { ...defaultOptions, ...opts }

  // trim trailing slashes
  opts.host = opts.host.replace(/\/+$/, '')

  let req = request.defaults({
    jar: jar,
    baseUrl: `${opts.host}/_/`,
    json: true
  })

  // wait until connections are complete before sending off requests
  const _request = (url, opts) => {
    return new Promise((resolve, reject) => {
      debug(opts.method, url, opts.body || opts.qs)
      mp.onceConnected(() => req(url, opts, (e, resp) => {
        if (e) reject(e)
        else if (resp.body.status !== 'ok') {
          reject(resp.body.data.length? resp.body.data[0]
                : /* otherwise */       resp.body.status)
        }
        else {
          resolve(resp.body.data)
        }
      }))
    })
  }
  const post = (url, data) => _request(url, { method: 'post', body: data })
  const get  = (url, data) => _request(url, { method: 'get', qs: data })
  const put  = (url, data) => _request(url, { method: 'put', body: data })
  const del  = (url, data) => _request(url, { method: 'delete', body: data })

  // log in
  const loginOpts = { jar, host: opts.host, authToken: true }
  let promise = opts.guest? login(loginOpts)
              : /* else */  login(opts.email, opts.password, loginOpts)
  promise
    .then(res => {
      let ws = mp.ws = socket(res.token)
      ws.on('error', e => mp.emit('error', e))

      mp.emit('login')

      let me = mp.getMe()
      ws.once('ack', () => {
        me.then(mp.emit.bind(mp, 'connected'))
      })
    })
    .catch(e => { mp.emit('error', e) })

  mp.on('login', () => {
    mp.connected = true
    mp._queue.forEach(fn => fn())
    mp._queue = []
  })

  // make miniplug!
  assign(mp, {
    // http yaddayadda
    _jar: jar,
    request: _request,
    get: get,
    post, put, del,
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

    // REST: Ban APIs
    getBans: partial(get, 'bans'),
    ban(uid, duration = BAN_DURATION.HOUR, reason = BAN_REASON.SPAMMING) {
      return post('bans/add', { userID: uid
                              , reason: reason
                              , duration: duration }).get(0)
    },
    unban(uid) {
      return del(`bans/${uid}`)
    },

    // REST: Grab APIs
    grab(targetPlaylist, hid) {
      return post('grabs', { playlistID: targetPlaylist, historyID: hid }).get(0)
    },

    // REST: Ignores APIs
    getIgnoredUsers: partial(get, 'ignores'),
    ignore(uid) {
      return post('ignores', { id: uid }).get(0)
    },
    unignore(uid) {
      return del(`ignores/${uid}`)
    },

    // REST: Mutes APIs
    getMutes: partial(get, 'mutes'),
    mute(uid, duration = MUTE_DURATION.SHORT, reason = MUTE_REASON.VIOLATING_RULES) {
      return post('mutes', { userID: uid
                           , duration: duration
                           , reason: reason })
    },
    unmute(uid) {
      return del(`mutes/${uid}`)
    },

    // REST: News APIs
    getNews: partial(get, 'news'),

    // REST: Playlist APIs
    getPlaylists: partial(get, 'playlists'),
    createPlaylist(name/*, initialMedia*/) {
      return post('playlists', { name: name })
    },
    deletePlaylist(pid) {
      return del(`playlists/${pid}`)
    },
    activatePlaylist(pid) {
      return put(`playlists/${pid}/activate`)
    },
    renamePlaylist(pid, name) {
      return put(`playlist/${pid}/rename`, { name: name })
    },
    shufflePlaylist(pid) {
      return put(`playlists/${pid}/shuffle`)
    },

    // Rest: Media APIs
    getMedia(pid) {
      return get(`playlists/${pid}/media`)
    },
    updateMedia(pid, mid, author, title) {
      return put(`playlists/${pid}/media/update`, { id: mid
                                                  , author: author
                                                  , title: title }).get(0)
    },
    moveMedia(pid, mids, before) {
      if (!Array.isArray(mids)) mids = [ mids ]
      return put(`playlists/${pid}/media/move`, { ids: mids
                                                , beforeID: before })
    },
    insertMedia(pid, medias, append = true) {
      return post(`playlists/${pid}/media/insert`, { media: medias
                                                   , append: append })
    },
    deleteMedia(pid, mids) {
      if (!Array.isArray(mids)) mids = [ mids ]
      return post(`playlists/${pid}/media/delete`, { ids: mids })
    }
  })

  mp.use(require('./plugins/users')())
  mp.use(require('./plugins/booth')())
  mp.use(require('./plugins/chat')())
  mp.use(require('./plugins/friends')())
  mp.use(require('./plugins/rooms')())

  return mp
}

export * from './constants'
