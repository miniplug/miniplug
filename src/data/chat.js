import assign from 'object-assign'
import partial from 'lodash.partial'
import unescape from 'unescape'
import Promise from 'bluebird'

const debug = require('debug')('miniplug:data:chat')

export default function wrapMessage(mp, message) {
  if (message.un) {
    message.un = unescape(message.un)
  }

  return assign(message, {
    id: message.cid,
    message: unescape(message.message),
    own() { return mp.me().id === message.uid },

    chat: mp.chat,
    reply: partial(mp.chat, `@${message.un}`),
    emote: partial(mp.chat, `/me @${message.un}`),

    delete: partial(mp.deleteChat, message.cid),

    getUser() {
      let user = mp.user && mp.user(message.uid)
      return user ? Promise.resolve(user) : mp.getUser(message.uid)
    }
  })
}
