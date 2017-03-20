import { partial } from '../util'
import _wrapHistoryEntry from '../data/historyEntry'

export default function historyPlugin () {
  return (mp) => {
    const wrapHistoryEntry = partial(_wrapHistoryEntry, mp)

    const getRoomHistory = () =>
      mp.get('rooms/history').map(wrapHistoryEntry)

    // Get the history for the logged-in user.
    const getOwnHistory = () =>
      mp.get('users/me/history').map(wrapHistoryEntry)

    const getProfile = (id) =>
      mp.get(`profile/${id}`).get(0)

    // Get the history for another user.
    const getOtherHistory = (id) =>
      getProfile(id).get('history').map(wrapHistoryEntry)

    // Get the history for a user. Defaults to the current user.
    const getUserHistory = (id = mp.me().id) =>
      mp.me().id === id ? getOwnHistory() : getOtherHistory(id)

    Object.assign(mp, {
      getRoomHistory,
      getUserHistory
    })
  }
}
