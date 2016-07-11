import flatten from 'flatten'
import partial from 'lodash.partial'
import _wrapUser from '../data/user'

const debug = require('debug')('miniplug:users')

const GUEST_ID = 0

export default function users () {
  return (mp) => {
    const wrapUser = partial(_wrapUser, mp)

    // local user cache/collection API
    mp._guests = 0
    mp._users = []

    mp.on('connected', user => {
      mp._user = wrapUser(user)
    })

    // keeping things in sync
    mp.on('roomState', ({ users, meta: { guests } }) => {
      mp._users.length = mp._guests = 0
      mp._users = users.map(wrapUser)
      mp._guests = guests
    })

    mp.on('login', () => {
      mp.ws.on('userJoin', user => {
        debug('join', user.id)
        if (user.guest) {
          mp._guests++
          mp.emit('guestJoin')
        } else {
          user = wrapUser(user)
          mp._users.push(user)
          mp.emit('userJoin', user)
        }
      })

      mp.ws.on('userLeave', (id) => {
        debug('leave', id)
        if (id === GUEST_ID) {
          mp._guests--
          mp.emit('guestLeave')
        } else {
          const i = mp._users.findIndex((user) => user.id === id)
          if (i !== -1) {
            const user = mp._users[i]
            mp._users.splice(i, 1)
            mp.emit('userLeave', user)
          }
        }
      })
    })

    const me = () => mp._user
    const user = (id) => mp._users.find((user) => user.id === id)
    const users = () => mp._users
    const guests = () => mp._guests

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

    // Public API
    Object.assign(mp, {
      me, user, users, guests, // local
      getMe, getUser, getUsers, // remote
      saveSettings, setAvatar, setBadge, setBlurb, setLanguage, // setters
      getTransactions,
      validateUsername
    })
  }
}
