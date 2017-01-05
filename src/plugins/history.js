import partial from 'lodash-es/partial'
import _wrapHistoryEntry from '../data/historyEntry'

export default function historyPlugin () {
  return (mp) => {
    const wrapHistoryEntry = partial(_wrapHistoryEntry, mp)

    const getRoomHistory = () =>
      mp.get('rooms/history').map(wrapHistoryEntry)

    const getUserHistory = () =>
      mp.get('users/me/history').map(wrapHistoryEntry)

    Object.assign(mp, {
      getRoomHistory,
      getUserHistory
    })
  }
}
