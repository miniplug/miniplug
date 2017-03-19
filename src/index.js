import { partial } from 'ap'
import { EventEmitter } from 'events'
import createDebug from 'debug'

import * as constants from './constants'
import createBackoff from './createBackoff'
import httpPlugin from './plugins/http'
import connectPlugin from './plugins/connect'
import usersPlugin from './plugins/users'
import ignoresPlugin from './plugins/ignores'
import mutesPlugin from './plugins/mutes'
import bansPlugin from './plugins/bans'
import notificationsPlugin from './plugins/notifications'
import boothPlugin from './plugins/booth'
import waitlistPlugin from './plugins/waitlist'
import historyPlugin from './plugins/history'
import chatPlugin from './plugins/chat'
import friendsPlugin from './plugins/friends'
import roomsPlugin from './plugins/rooms'
import playlistsPlugin from './plugins/playlists'
import storePlugin from './plugins/store'
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
  historyPlugin,
  chatPlugin,
  friendsPlugin,
  roomsPlugin,
  playlistsPlugin,
  storePlugin,
  ...constants
})

export default miniplug

// Implementation

const debug = createDebug('miniplug:miniplug')
const defaultOptions = {
  host: 'https://plug.dj',
  connect: true
}

function miniplug (opts = {}) {
  // Faux-inherit from EventEmitter.
  const emitter = new EventEmitter()
  const mp = Object.create(emitter)

  opts = { ...defaultOptions, ...opts }

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

  use(httpPlugin({
    host: plugHost,
    // This is the same backoff as used in Sooyou/plugged:
    // https://github.com/SooYou/plugged/blob/856bd0ef47307491c0ad95cba7006cd4721828fd/query.js#L4
    // And that seems pretty robust.
    backoff: createBackoff({ increment: 200, max: 2200 })
  }))
  use(connectPlugin({
    host: plugHost
  }))
  use(usersPlugin())
  use(ignoresPlugin())
  use(mutesPlugin())
  use(bansPlugin())
  use(notificationsPlugin())
  use(boothPlugin())
  use(waitlistPlugin())
  use(historyPlugin())
  use(chatPlugin({
    backoff: createBackoff({ increment: 70, max: 700 })
  }))
  use(friendsPlugin())
  use(roomsPlugin())
  use(playlistsPlugin())
  use(storePlugin())
  use(votePlugin())

  // Misc
  Object.assign(mp, {
    // REST: News APIs
    getNews: partial(mp.get, 'news'),
  })

  if (opts.connect) mp.connect(opts)

  return mp
}
