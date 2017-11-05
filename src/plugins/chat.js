import { partial } from '../util'
import createDebug from 'debug'

const debug = createDebug('miniplug:chat')

export default function chatPlugin (opts) {
  opts = Object.assign({
    // how long to wait for chat messages to come back
    timeout: 7000,
    // allow users to pass their own rate limiting function,
    // this will get a sensible default at some point
    backoff: (fn) => fn
  }, opts)

  return (mp) => {
    // translate raw socket events to wrapped miniplug events
    function onChat (msg) {
      debug('chat', msg.uid, msg.un, msg.message)
      mp.emit('chat', mp.wrapMessage(msg))
    }

    function onChatDelete ({ c, mi }) {
      debug('chatDelete', mi, c)
      mp.emit('chatDelete', {
        cid: c,
        user: mp.user(mi) || mp.wrapUser({ id: mi })
      })
    }

    function onGifted (ref) {
      mp.emit('gifted', {
        sender: ref.s,
        recipient: ref.r
      })
    }

    mp.on('connected', () => {
      mp.ws.on('chat', onChat)
      mp.ws.on('chatDelete', onChatDelete)
      mp.ws.on('gifted', onGifted)
    })

    // REST API
    const deleteChat = (cid) =>
      mp.del(`chat/${cid}`)

    // Socket API
    const chat = opts.backoff((...args) => {
      const ws = mp.ws
      const message = args.join(' ')
      debug('send', message)
      ws.chat(message)
      // attempt to resolve when the message comes back
      return new Promise((resolve, reject) => {
        const intv = setTimeout(() => {
          mp.removeListener('chat', onChat)
          reject(new Error('Waiting for chat message to come back timed out.'))
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
