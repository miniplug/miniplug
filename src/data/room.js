import partial from 'lodash-es/partial'
import { unescape } from 'plug-message-split'
import makeProto from '../wrap'

export default function wrapRoom (mp, room) {
  if (room.welcome) {
    room.welcome = unescape(room.welcome)
  }
  if (room.description) {
    room.description = unescape(room.description)
  }

  room.isFavorite = room.favorite
  delete room.favorite

  return makeProto(room, {
    join: partial(mp.join, room.slug),

    favorite: partial(mp.favoriteRoom, room.id),
    unfavorite: partial(mp.unfavoriteRoom, room.id)
  })
}
