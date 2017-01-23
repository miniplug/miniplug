import wrapUser from './user'

export default function wrapWaitlist (mp, waitlist) {
  const getId = (item) =>
    typeof item === 'object' ? item.id : item

  // Have to use a real class to get working inheritance from Array.
  class Waitlist extends Array {
    contains (user) {
      return wrapped.some((waiting) => waiting.id === getId(user))
    }
    positionOf (user) {
      return wrapped.findIndex((waiting) => waiting.id === getId(user))
    }
    toJSON () { return waitlist }
  }
  const wrapped = new Waitlist()

  waitlist.forEach((id) => {
    wrapped.push(wrapUser(mp, { id: id }))
  })

  return wrapped
}
