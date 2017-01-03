import partial from 'lodash-es/partial'
import { stringify as stringifyQS } from 'querystring'
import createDebug from 'debug'
import _wrapRoom from '../data/room'

const debug = createDebug('miniplug:rooms')

export default function rooms () {
  const currentRoom = Symbol('Current room')

  return (mp) => {
    const wrapRoom = partial(_wrapRoom, mp)

    mp[currentRoom] = null

    mp.on('roomState', (state) => {
      mp[currentRoom] = wrapRoom(state.meta)
    })

    const room = () => mp[currentRoom]

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
        .tap(mp.emit.bind(mp, 'roomState'))

    const validateRoomName = (name) =>
      mp.get(`rooms/validate/${encodeURIComponent(name)}`)
        .get(0)
        .catch(() => Promise.reject(new Error('Room name unavailable.')))

    Object.assign(mp, {
      // local
      room,
      // remote
      getRooms,
      getFavorites,
      createRoom,
      validateRoomName,
      // favorites
      favoriteRoom,
      unfavoriteRoom,
      // joining
      join,
      getRoomState
    })
  }
}
