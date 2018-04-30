import EventEmitter from 'events'
import https from 'https'
import createDebug from 'debug'
import createBackoff from 'linear-promise-backoff-queue'
import { partial } from './util'
import * as constants from './constants'
import { errorClasses } from './errors'
import dataModelPlugin from './plugins/wrappers'
import httpPlugin from './plugins/http'
import connectPlugin from './plugins/connect'
import usersPlugin from './plugins/users'
import ignoresPlugin from './plugins/ignores'
import mutesPlugin from './plugins/mutes'
import bansPlugin from './plugins/bans'
import notificationsPlugin from './plugins/notifications'
import boothPlugin from './plugins/booth'
import waitlistPlugin from './plugins/waitlist'
import waitlistBansPlugin from './plugins/waitlistBans'
import historyPlugin from './plugins/history'
import chatPlugin from './plugins/chat'
import friendsPlugin from './plugins/friends'
import roomsPlugin from './plugins/rooms'
import playlistsPlugin from './plugins/playlists'
import storePlugin from './plugins/store'
import systemPlugin from './plugins/system'
import votePlugin from './plugins/vote'

// Exports

Object.assign(miniplug, {
  httpPlugin,
  connectPlugin,
  usersPlugin,
  ignoresPlugin,
  mutesPlugin,
  bansPlugin,
  notificationsPlugin,
  boothPlugin,
  waitlistPlugin,
  waitlistBansPlugin,
  historyPlugin,
  chatPlugin,
  friendsPlugin,
  roomsPlugin,
  playlistsPlugin,
  storePlugin,
  systemPlugin,
  votePlugin
}, constants, errorClasses)

export default miniplug

// Implementation

const { Agent } = https
const debug = createDebug('miniplug:miniplug')
const defaultOptions = {
  host: 'https://plug.dj',
  connect: true
}

function miniplug (opts = {}) {
  // Faux-inherit from EventEmitter.
  const emitter = new EventEmitter()
  emitter.setMaxListeners(100)
  const mp = Object.create(emitter)

  opts = Object.assign({}, defaultOptions, opts)

  if (typeof opts.agent === 'undefined') {
    opts.agent = new Agent({ keepAlive: true })
  }

  // trim trailing slashes
  const plugHost = opts.host.replace(/\/+$/, '')

  mp.on('login', () => debug('authenticated'))
  mp.on('connected', () => debug('connected'))

  // Super-Duper Advanced Plugin API
  function use (plugin) {
    plugin(mp)
    return mp
  }

  // make miniplug!
  mp.use = use

  use(dataModelPlugin())
  use(httpPlugin({
    host: plugHost,
    agent: opts.agent,
    // This is the same backoff as used in Sooyou/plugged:
    // https://github.com/SooYou/plugged/blob/856bd0ef47307491c0ad95cba7006cd4721828fd/query.js#L4
    // And that seems pretty robust.
    backoff: createBackoff({ increment: 200, max: 2200, Promise })
  }))
  use(connectPlugin({
    host: plugHost,
    agent: opts.agent
  }))
  use(usersPlugin())
  use(ignoresPlugin())
  use(mutesPlugin())
  use(bansPlugin())
  use(notificationsPlugin())
  use(boothPlugin())
  use(waitlistPlugin())
  use(waitlistBansPlugin())
  use(historyPlugin())
  use(chatPlugin({
    backoff: createBackoff({ increment: 70, max: 700, Promise })
  }))
  use(friendsPlugin())
  use(roomsPlugin())
  use(playlistsPlugin())
  use(storePlugin())
  use(systemPlugin())
  use(votePlugin())

  // Misc
  Object.assign(mp, {
    // REST: News APIs
    getNews: partial(mp.get, 'news')
  })

  if (opts.connect) mp.connect(opts)

  return mp
}
