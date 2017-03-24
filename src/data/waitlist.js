import { getId } from '../util'

// Have to use a real class to get working inheritance from Array. Methods are
// still added inside wrapWaitlist, as usual.
class Waitlist extends Array {}

export default function wrapWaitlist (mp, waitlist) {
  const wrapped = Object.assign(new Waitlist(), {
    contains: (user) =>
      wrapped.some((waiting) => waiting.id === getId(user)),
    positionOf: (user) =>
      wrapped.findIndex((waiting) => waiting.id === getId(user)),
    toJSON: () => waitlist
  })

  waitlist.forEach((id) => {
    wrapped.push(mp.user(id) || mp.wrapUser({ id: id }))
  })

  return wrapped
}
