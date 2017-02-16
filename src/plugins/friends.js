import { partial } from 'ap'
import { unescape } from 'plug-message-split'
import _wrapUser from '../data/user'

export default function friendsPlugin () {
  return (mp) => {
    const wrapUser = partial(_wrapUser, mp)

    function onFriendRequest (name) {
      getFriendRequests().each((request) => {
        if (unescape(request.username) === unescape(name)) {
          mp.emit('friendRequest', wrapUser(request))
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
      mp.get('friends').map(wrapUser)
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
