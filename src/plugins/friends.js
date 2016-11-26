import partial from 'lodash.partial'
import wrapUser from '../data/user'

export default function friends () {
  return (mp) => {
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
