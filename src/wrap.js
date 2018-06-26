import { copyProperties } from './util'

/**
 * Add methods to an object's prototype.
 */
export default function makeProto (obj, methods) {
  const proto = copyProperties({
    toJSON: () => obj
  }, methods)
  const instance = Object.create(proto)
  copyProperties(instance, obj)
  return instance
}
