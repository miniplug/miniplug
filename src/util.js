/**
 * Flatten nested arrays.
 *
 *     flatten([ 4, 5, [ 8, 7 ] ])
 *     // → [ 4, 5, 8, 7 ]
 *
 * @param {Array} arrs
 */
export function flatten (arrs) {
  return [].concat(...arrs)
}

/**
 * Get the ID for an object.
 *
 * @param {object} item
 * @param {string} idProp
 */
export function getId (item, idProp = 'id') {
  return typeof item === 'object' ? item[idProp] : item
}

/**
 * Get IDs for an array of objects.
 *
 * @param {Array.<object>} items
 */
export function getIds (items, idProp = 'id') {
  const arr = Array.isArray(medias) ? medias : [ medias ]
  return arr.map((item) => getId(item, idProp))
}

/**
 * Parse a string timestamp from plug.dj.
 *
 * @param {string} timestamp
 */
export function parseDate (timestamp) {
  return new Date(`${timestamp} UTC`)
}

/**
 * Fill in fn's arguments with ...args from the beginning of fn's arguments
 * list.
 *
 * @param {Function} fn
 * @param {...*} args
 */
export function partial (fn, ...args) {
  return function (...rest) { return fn(...args, ...rest) }
}
