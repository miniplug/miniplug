import login from 'plug-login'
import socket from 'plug-socket'
import got from 'got'
import partial from 'lodash.partial'
import Promise from 'bluebird'
import { EventEmitter } from 'events'
import createDebug from 'debug'

import * as constants from './constants'
import usersPlugin from './plugins/users'
import boothPlugin from './plugins/booth'
import chatPlugin from './plugins/chat'
import friendsPlugin from './plugins/friends'
import roomsPlugin from './plugins/rooms'
import playlistsPlugin from './plugins/playlists'

// Exports

const exports = miniplug
exports.usersPlugin = usersPlugin
exports.boothPlugin = boothPlugin
exports.chatPlugin = chatPlugin
exports.friendsPlugin = friendsPlugin
exports.roomsPlugin = roomsPlugin
exports.playlistsPlugin = playlistsPlugin
Object.assign(exports, constants)

export default exports

// Implementation

const debug = createDebug('miniplug:miniplug')
const defaultOptions = {
  host: 'https://plug.dj'
}

function miniplug (opts = {}) {
  const mp = new EventEmitter()

  opts = { ...defaultOptions, ...opts }

  // trim trailing slashes
  const plugHost = opts.host.replace(/\/+$/, '')

  // log in
  const loginOpts = { host: plugHost, authToken: true }
  const loginPromise = Promise.resolve(
    opts.email
      ? login.user(opts.email, opts.password, loginOpts)
      : login.guest(loginOpts)
  )

  const ws = socket()

  const connectionPromise = loginPromise
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
    .catch(e => { mp.emit('error', e) })

  // wait until connections are complete before sending off requests
  const sendRequest = (url, opts) =>
    mp.connected
      .tap(() => debug(opts.method, url, opts.body || opts.query))
      .then((session) =>
        got(`${plugHost}/_/${url}`, {
          headers: {
            cookie: session.cookie,
            'content-type': 'application/json'
          },
          json: true,
          ...opts,
          body: opts.body ? JSON.stringify(opts.body) : undefined
        })
      )
      .then((resp) => {
        if (resp.body.status !== 'ok') {
          throw new Error(resp.body.data.length ? resp.body.data[0] : resp.body.status)
        }
        return resp.body.data
      })
  const post = (url, data) => sendRequest(url, { method: 'post', body: data })
  const get = (url, data) => sendRequest(url, { method: 'get', query: data })
  const put = (url, data) => sendRequest(url, { method: 'put', body: data })
  const del = (url, data) => sendRequest(url, { method: 'delete', body: data })

  // make miniplug!
  Object.assign(mp, {
    ws: ws,
    // http yaddayadda
    request: sendRequest,
    get,
    post,
    put,
    del,

    connected: connectionPromise,

    // Super-Duper Advanced Plugin API
    use (plugin) {
      plugin(this)
      return this
    },

    // REST: Ban APIs
    getBans: partial(get, 'bans'),
    ban: (uid, duration = constants.BAN_DURATION.HOUR, reason = constants.BAN_REASON.SPAMMING) =>
      post('bans/add', {
        userID: uid,
        reason: reason,
        duration: duration
      }).get(0),
    unban: (uid) =>
      del(`bans/${uid}`),

    // REST: Grab APIs
    grab: (targetPlaylist, hid) =>
      post('grabs', { playlistID: targetPlaylist, historyID: hid }).get(0),

    // REST: Ignores APIs
    getIgnoredUsers: partial(get, 'ignores'),
    ignore: (uid) =>
      post('ignores', { id: uid }).get(0),
    unignore: (uid) =>
      del(`ignores/${uid}`),

    // REST: Mutes APIs
    getMutes: partial(get, 'mutes'),
    mute: (uid, duration = constants.MUTE_DURATION.SHORT, reason = constants.MUTE_REASON.VIOLATING_RULES) =>
      post('mutes', {
        userID: uid,
        duration: duration,
        reason: reason
      }),
    unmute: (uid) =>
      del(`mutes/${uid}`),

    // REST: News APIs
    getNews: partial(get, 'news'),
  })

  mp.use(usersPlugin())
  mp.use(boothPlugin())
  mp.use(chatPlugin())
  mp.use(friendsPlugin())
  mp.use(roomsPlugin())
  mp.use(playlistsPlugin())

  return mp
}
