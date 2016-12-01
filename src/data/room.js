import partial from 'lodash.partial'
import wrapUser from './user'
import { unescape } from 'plug-message-split'

export default function wrapRoom (mp, room) {
  if (room.users) {
    room.users = room.users.map(partial(wrapUser, mp))
  }

  if (room.meta) {
    if (room.meta.welcome) {
      room.meta.welcome = unescape(room.meta.welcome)
    }
    if (room.meta.description) {
      room.meta.description = unescape(room.meta.description)
    }
  }

  return Object.assign(room, {
    join: partial(mp.join, room.slug),

    favorite: partial(mp.favoriteRoom, room.id),
    unfavorite: partial(mp.unfavoriteRoom, room.id)
  })
}
