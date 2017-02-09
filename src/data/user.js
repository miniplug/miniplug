import partial from 'lodash-es/partial'
import { unescape } from 'plug-message-split'
import makeProto from '../wrap'

export default function wrapUser (mp, user) {
  user.username = user.guest ? null : unescape(user.username || '')

  // Chat mention string for this user.
  const mention = `@${user.username}`

  return makeProto(user, {
    chat: partial(mp.chat, mention),
    emote: partial(mp.chat, `/me ${mention}`),

    add: partial(mp.addDJ, user.id),
    move: partial(mp.moveDJ, user.id),
    remove: partial(mp.removeDJ, user.id),
    skip: partial(mp.skipDJ, user.id),

    befriend: partial(mp.befriend, user.id),
    rejectRequest: partial(mp.rejectFriendRequest, user.id),

    ignore: partial(mp.ignore, user.id),
    unignore: partial(mp.unignore, user.id),

    mute: partial(mp.mute, user.id),
    unmute: partial(mp.unmute, user.id),

    ban: partial(mp.ban, user.id),
    unban: partial(mp.unban, user.id),

    getHistory: partial(mp.getUserHistory, user.id),

    mention: () => mention,
    // Allows mentioning users by doing `Hello ${user}` in chat messages.
    toString: () => mention
  })
}
