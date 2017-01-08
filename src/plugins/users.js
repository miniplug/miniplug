import flatten from 'lodash-es/flatten'
import partial from 'lodash-es/partial'
import createDebug from 'debug'
import _wrapUser from '../data/user'

const debug = createDebug('miniplug:users')

const GUEST_ID = 0

export default function usersPlugin () {
  const currentGuestsCount = Symbol('Guests count')
  const currentUsers = Symbol('Users')
  const currentUser = Symbol('Me')

  return (mp) => {
    const wrapUser = partial(_wrapUser, mp)

    // local user cache/collection API
    mp[currentGuestsCount] = 0
    mp[currentUsers] = []

    mp.on('connected', (user) => {
      mp[currentUser] = wrapUser(user)
    })

    // keeping things in sync
    mp.on('roomState', ({ users, meta: { guests } }) => {
      mp[currentUsers] = users.map(wrapUser)
      mp[currentGuestsCount] = guests
    })

    mp.ws.on('userJoin', (user) => {
      debug('join', user.id)
      if (user.guest) {
        mp[currentGuestsCount] += 1
        mp.emit('guestJoin')
      } else {
        user = wrapUser(user)
        mp[currentUsers].push(user)
        mp.emit('userJoin', user)
      }
    })

    mp.ws.on('userLeave', (id) => {
      debug('leave', id)
      if (id === GUEST_ID) {
        if (mp[currentGuestsCount] > 0) {
          mp[currentGuestsCount] -= 1
        }
        mp.emit('guestLeave')
      } else {
        const i = mp[currentUsers].findIndex((user) => user.id === id)
        if (i !== -1) {
          const user = mp[currentUsers][i]
          mp[currentUsers].splice(i, 1)
          mp.emit('userLeave', user)
        }
      }
    })

    const me = () => mp[currentUser]
    const user = (id) => mp[currentUsers].find((user) => user.id === id)
    const users = () => mp[currentUsers]
    const guests = () => mp[currentGuestsCount]

    // REST API
    const getMe = () => mp.get('users/me').get(0).then(wrapUser)
    const getUser = uid => mp.get(`users/${uid}`).get(0).then(wrapUser)
    // pass IDs or arrays of IDs
    const getUsers = (...uids) =>
      mp.post('users/bulk', {
        ids: flatten(uids)
      }).map(wrapUser)

    // current user & profile
    const saveSettings = partial(mp.put, 'users/settings')
    const setAvatar = (avatar) =>
      mp.put('users/avatar', { id: avatar })
    const setBadge = (badge) =>
      mp.put('users/badge', { id: badge })
    const setBlurb = (blurb) =>
      mp.put('profile/blurb', { blurb: blurb })
    const setLanguage = (lang) =>
      mp.put('users/language', { language: lang })
    const getTransactions = partial(mp.get, 'users/me/transactions')

    const validateUsername = (name) =>
      mp.get(`users/validate/${encodeURIComponent(name)}`)
        .get(0)
        .catch(() => Promise.reject(new Error('Username unavailable.')))

    // Public API
    Object.assign(mp, {
      // local
      me,
      user,
      users,
      guests,
      // remote
      getMe,
      getUser,
      getUsers,
      // setters
      saveSettings,
      setAvatar,
      setBadge,
      setBlurb,
      setLanguage,

      getTransactions,
      validateUsername
    })
  }
}
