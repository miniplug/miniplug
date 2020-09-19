import { partial } from '../util.js'
import { unescape } from 'plug-message-split'

export default function friendsPlugin () {
  return (mp) => {
    // Friendship events only include the requesting/accepting user's name.
    // Plug.dj refreshes its client-side friends or invites list when these
    // events come in. Miniplug requests the friends or invites list and emits
    // the events with a user object, so it's easy to respond to the events
    // using the `user.befriend` and `user.rejectRequest` methods.
    function onFriendRequest (name) {
      getFriendRequests().each((request) => {
        if (unescape(request.username) === unescape(name)) {
          mp.emit('friendRequest', mp.wrapUser(request))
        }
      })
    }

    function onFriendAccept (name) {
      getFriends().each((friend) => {
        if (friend.username === unescape(name)) {
          mp.emit('friendAccept', friend)
        }
      })
    }

    mp.on('connected', () => {
      mp.ws.on('friendRequest', onFriendRequest)
      mp.ws.on('friendAccept', onFriendAccept)
    })

    // REST Friend API
    const getFriends = () =>
      mp.get('friends').map(mp.wrapUser)
    const befriend = (uid) =>
      mp.post('friends', { id: uid })
    const unfriend = (uid) =>
      mp.del(`friends/${uid}`)
    const getFriendRequests = partial(mp.get, 'friends/invites')
    const rejectFriendRequest = (uid) =>
      mp.put('friends/ignore', { id: uid })

    // Public API
    Object.assign(mp, {
      getFriends,
      befriend,
      unfriend,
      getFriendRequests,
      rejectFriendRequest
    })
  }
}
