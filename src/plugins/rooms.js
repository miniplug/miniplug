import partial from 'lodash-es/partial'
import { stringify as stringifyQS } from 'querystring'
import _wrapRoom from '../data/room'

export default function rooms () {
  return (mp) => {
    const wrapRoom = partial(_wrapRoom, mp)

    const room = () => mp._room

    const getRooms = (query = '', page = 0, limit = 50) =>
      mp.get(`rooms?${stringifyQS({ q: query, page, limit })}`)
        .map(wrapRoom)
    const getFavorites = (query = '', page = 0, limit = 50) =>
      mp.get(`rooms/favorites?${stringifyQS({ q: query, page, limit })}`)
        .map(wrapRoom)
    const createRoom = (name, isPrivate = false) =>
      mp.post('rooms', { name: name, private: isPrivate }).get(0)

    const favoriteRoom = (rid) =>
      mp.post('rooms/favorites', { id: rid })
    const unfavoriteRoom = (rid) =>
      mp.del(`rooms/favorites/${rid}`)
    const join = (slug) =>
      mp.post('rooms/join', { slug: slug }).then(getRoomState)
    const getRoomState = () =>
      mp.get('rooms/state').get(0)
        .then(wrapRoom)
        .tap((room) => {
          mp._room = room
        })
        .tap(mp.emit.bind(mp, 'roomState'))

    Object.assign(mp, {
      // local
      room,
      // remote
      getRooms,
      getFavorites,
      createRoom,
      // favorites
      favoriteRoom,
      unfavoriteRoom,
      // joining
      join,
      getRoomState
    })
  }
}
