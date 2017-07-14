export const ROLE = {
  NONE: 0,
  DJ: 1,
  BOUNCER: 2,
  MANAGER: 3,
  COHOST: 4,
  HOST: 5,

  AMBASSADOR: 3,
  ADMIN: 5
}

export const MEDIA_SOURCE = {
  YOUTUBE: 1,
  SOUNDCLOUD: 2
}

export const BAN_DURATION = {
  HOUR: 'h',
  DAY: 'd',
  PERMA: 'f'
}

export const BAN_REASON = {
  SPAMMING: 1,
  VERBAL_ABUSE: 2,
  OFFENSIVE_PLAYS: 3,
  GENRE: 4,
  ATTITUDE: 5
}

export const MUTE_DURATION = {
  SHORT: 's',
  MEDIUM: 'm',
  LONG: 'l'
}

export const MUTE_REASON = {
  VIOLATING_RULES: 1,
  VERBAL_ABUSE: 2,
  SPAMMING: 3,
  LANGUAGE: 4,
  ATTITUDE: 5
}

export const WAITLIST_BAN_DURATION = {
  SHORT: 's',
  MEDIUM: 'm',
  LONG: 'l',
  PERMA: 'f'
}

export const WAITLIST_BAN_REASON = BAN_REASON
