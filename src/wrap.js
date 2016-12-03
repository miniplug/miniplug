/**
 * Add methods to an object's prototype.
 */
export default function makeProto (obj, methods) {
  const proto = Object.assign({ toJSON: () => obj }, methods)
  const instance = Object.create(proto)
  Object.assign(instance, obj)
  return instance
}
