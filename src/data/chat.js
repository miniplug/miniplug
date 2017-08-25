import { partial } from '../util'
import { unescape } from 'plug-message-split'
import makeProto from '../wrap'

export default function wrapMessage (mp, message) {
  if (message.un) {
    message.un = unescape(message.un)
  }

  message.id = message.cid
  message.message = unescape(message.message)
  message.user = mp.user(message.uid) ||
    mp.wrapUser({ id: message.uid, username: message.un })

  return makeProto(message, {
    own: () => mp.me().id === message.uid,

    chat: mp.chat,
    reply: partial(mp.chat, `@${message.un}`),
    emote: partial(mp.chat, `/me @${message.un}`),

    delete: partial(mp.deleteChat, message.cid),

    getUser () {
      const user = mp.user && (mp.user(message.uid) ||
        mp.wrapUser({ id: message.uid, username: message.un }))
      return user ? Promise.resolve(user) : mp.getUser(message.uid)
    }
  })
}
