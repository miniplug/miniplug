export default function historyPlugin () {
  return (mp) => {
    const getRoomHistory = () =>
      mp.get('rooms/history').map(mp.wrapHistoryEntry)

    // Get the history for the logged-in user.
    const getOwnHistory = () =>
      mp.get('users/me/history').map(mp.wrapHistoryEntry)

    const getProfile = (id) =>
      mp.get(`profile/${id}`).get(0)

    // Get the history for another user.
    const getOtherHistory = (id) =>
      getProfile(id).get('history').map(mp.wrapHistoryEntry)

    // Get the history for a user. Defaults to the current user.
    const getUserHistory = (id = mp.me().id) =>
      mp.me().id === id ? getOwnHistory() : getOtherHistory(id)

    Object.assign(mp, {
      getRoomHistory,
      getUserHistory
    })
  }
}
