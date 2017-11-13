import createDebug from 'debug'
import { flatten, partial } from '../util'

const debug = createDebug('miniplug:users')

const GUEST_ID = 0

const kGuestsCount = Symbol('Guests count')
const kUsers = Symbol('Users')
const kCurrentUser = Symbol('Me')

export default function usersPlugin () {
  return (mp) => {
    // local user cache/collection API
    mp[kGuestsCount] = 0
    mp[kUsers] = []

    function onUserJoin (user) {
      debug('join', user.id)
      if (user.guest) {
        mp[kGuestsCount] += 1
        mp.emit('guestJoin')
      } else {
        user = mp.wrapUser(user)
        mp[kUsers].push(user)
        mp.emit('userJoin', user)
      }
    }

    function onUserLeave (id) {
      debug('leave', id)
      if (id === GUEST_ID) {
        if (mp[kGuestsCount] > 0) {
          mp[kGuestsCount] -= 1
        }
        mp.emit('guestLeave')
      } else {
        const i = mp[kUsers].findIndex((user) => user.id === id)
        if (i !== -1) {
          const user = mp[kUsers][i]
          mp[kUsers].splice(i, 1)
          mp.emit('userLeave', user)
        }
      }
    }

    function onUserUpdate (props) {
      const user = mp.user(props.i)
      if (!user) return

      delete props.i
      const oldProps = Object.keys(props).reduce((o, name) => {
        o[name] = user[name]
        return o
      }, {})

      Object.assign(user, props)

      mp.emit('userUpdate', user, oldProps)
    }

    // Emit `userUpdate` events for `role` updates.
    function onStaffUpdate (props) {
      props.u.forEach((ref) => {
        onUserUpdate({ i: ref.i, role: ref.p })

        mp.emit('modStaff', {
          moderator: mp.user(props.mi) || mp.wrapUser({ id: props.mi, username: props.m }),
          user: mp.user(ref.i) || mp.wrapUser({ id: ref.i, username: ref.n }),
          role: ref.p
        })
      })
    }

    mp.on('connected', (user) => {
      mp[kCurrentUser] = mp.wrapUser(user)

      mp.ws.on('userJoin', onUserJoin)
      mp.ws.on('userLeave', onUserLeave)
      mp.ws.on('userUpdate', onUserUpdate)
      mp.ws.on('modStaff', onStaffUpdate)
    })

    // keeping things in sync
    mp.on('roomState', ({ users, meta: { guests } }) => {
      mp[kUsers] = users.map(mp.wrapUser)
      mp[kGuestsCount] = guests
    })

    const me = () => mp[kCurrentUser]
    const userByProp = (prop) => (value) => {
      if (mp[kCurrentUser] && value === mp[kCurrentUser][prop]) {
        return mp[kCurrentUser]
      }
      return mp[kUsers].find((user) => user[prop] === value)
    }
    const user = userByProp('id')
    const userByName = userByProp('username')
    // TODO May want to include `me()` in the `users()` list in v2.0.0. I'm not
    // sure which is more expected.
    const users = () => mp[kUsers]
    const guests = () => mp[kGuestsCount]

    // REST API
    const getMe = () => mp.get('users/me').get(0).then(mp.wrapUser)
    const getUser = uid => mp.get(`users/${uid}`).get(0).then(mp.wrapUser)
    // pass IDs or arrays of IDs
    const getUsers = (...uids) =>
      mp.post('users/bulk', {
        ids: flatten(uids)
      }).map(mp.wrapUser)

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
      userByName,
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
