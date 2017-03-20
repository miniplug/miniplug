import { partial } from '../util'

export default function ignoresPlugin () {
  return (mp) => {
    const getIgnoredUsers = partial(mp.get, 'ignores')
    const ignore = (uid) =>
      mp.post('ignores', { id: uid }).get(0)
    const unignore = (uid) =>
      mp.del(`ignores/${uid}`)

    Object.assign(mp, {
      getIgnoredUsers,
      ignore,
      unignore
    })
  }
}
