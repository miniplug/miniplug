import assign from 'object-assign'

// turns a string of words into an object of { WORD: number }
const enumish = (list, start = 0) => list.split(' ')
  .reduce((o, name, i) => assign(o, { [name]: start + i }), {})

export const ROLE = assign(enumish('NONE DJ BOUNCER MANAGER COHOST HOST')
                          , { AMBASSADOR: 3, ADMIN: 5 })

export const MEDIA_SOURCE = enumish('YOUTUBE SOUNDCLOUD', 1)

export const BAN_DURATION = { HOUR: 'h', DAY: 'd', PERMA: 'f' }
export const BAN_REASON =
  enumish('SPAMMING VERBAL_ABUSE OFFENSIVE_PLAYS GENRE ATTITUDE', 1)

export const MUTE_DURATION = { SHORT: 's', MEDIUM: 'm', LONG: 'l' }
