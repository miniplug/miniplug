import Promise from 'bluebird'
import partial from 'lodash.partial'
import createDebug from 'debug'
import wrapMessage from '../data/chat'

const debug = createDebug('miniplug:chat')

export default function chat (opts) {
  opts = {
    // how long to wait for chat messages to come back
    timeout: 7000,
    // allow users to pass their own rate limiting function,
    // this will get a sensible default at some point
    backoff: (fn) => fn,
    ...opts
  }

  return (mp) => {
    // translate raw socket events to wrapped miniplug events
    mp.on('login', () => {
      mp.ws.on('chat', (msg) => {
        debug('chat', msg.uid, msg.un, msg.message)
        mp.emit('chat', wrapMessage(mp, msg))
      })
    })

    // REST API
    const deleteChat = (cid) =>
      mp.del(`chat/${cid}`)

    // Socket API
    const chat = opts.backoff((...args) => {
      const ws = mp.ws
      const message = args.join(' ')
      ws.chat(message)
      // attempt to resolve when the message comes back
      return new Promise((resolve, reject) => {
        const intv = setTimeout(() => {
          mp.removeListener('chat', onChat)
          reject()
        }, opts.timeout)

        const onChat = (chat) => {
          debug('is same?', chat.own(), message, chat.message)
          // TODO ensure that chat messages are unescaped enough for this
          // (they aren't)
          if (chat.own() && chat.message === message) {
            mp.removeListener('chat', onChat)
            clearTimeout(intv)
            resolve(chat)
          }
        }

        mp.on('chat', onChat)
      })
    })
    const emote = partial(chat, '/me')

    // Public API
    Object.assign(mp, {
      deleteChat,
      chat,
      emote
    })
  }
}
