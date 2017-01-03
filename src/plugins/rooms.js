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

    // Add a handler to process a room property update.
    //
    //  * `eventName` - Plug.dj socket event name for the property.
    //  * `sockProp` - Property name of the new value on the plug.dj socket
    //        event parameter.
    //  * `roomProp` - Property name for the value on the miniplug room object.
    function addUpdateHandler (eventName, sockProp, roomProp) {
      mp.ws.on(eventName, (data, targetSlug) => {
        const user = mp.user(data.u)
        const value = data[sockProp]

        debug(eventName, user && user.id, value)

        if (mp[currentRoom] && mp[currentRoom].slug === targetSlug) {
          mp[currentRoom][roomProp] = value
        }

        mp.emit(eventName, value, user)
        mp.emit('roomUpdate', {
          [roomProp]: value
        }, user)
      })
    }

    addUpdateHandler('roomNameUpdate', 'n', 'name')
    addUpdateHandler('roomDescriptionUpdate', 'd', 'description')
    addUpdateHandler('roomWelcomeUpdate', 'w', 'welcome')
    addUpdateHandler('roomMinChatLevelUpdate', 'm', 'minChatLevel')

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
