import partial from 'lodash.partial'
import { unescape } from 'plug-message-split'

export default function wrapUser (mp, user) {
  return Object.assign(user, {
    username: unescape(user.username),

    chat: partial(mp.chat, `@${user.username}`),
    emote: partial(mp.chat, `/me @${user.username}`),

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
    unban: partial(mp.unban, user.id)
  })
}
