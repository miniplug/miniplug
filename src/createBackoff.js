import Promise from 'bluebird'
import createDebug from 'debug'

const debug = createDebug('miniplug:backoff')

/**
 * Create a linear incremental backoff function. Returns a function that wraps
 * a Promise-returning function.
 *
 * **Usage**
 *
 *   const func = () => Promise.resolve('done')
 *   const backoff = createBackoff({ increment: 200, max: 2200 })
 *   const throttled = backoff(func)
 *   throttled().then(console.log) // Resolves immediately
 *   throttled().then(console.log) // Resolves after 200 ms
 */
export default function createBackoff ({ increment, max }) {
  let queuedCalls = 0
  let currentDelay = 0
  let lastCall = Promise.resolve()

  function queueCall () {
    queuedCalls += 1
    // Keep increasing the delay as more calls are queued.
    currentDelay = Math.min(currentDelay + increment, max)
    debug('queued', queuedCalls, currentDelay)
  }
  function unqueueCall () {
    queuedCalls -= 1
    // If our queue is empty, reset the delay.
    if (queuedCalls === 0) {
      currentDelay = 0
    }
    debug('unqueued', queuedCalls, currentDelay)
  }

  return (fn) => function (...args) {
    queueCall()

    debug('calling args', args.length)

    // `result` will resolve with the result of the function call.
    const result = lastCall.then(() => fn(...args))

    // `lastCall` will resolve after the backoff duration is over.
    lastCall = result
      .return(null) // Ignore return value of previous call.
      .catch(() => null) // Ignore errors.
      .delay(currentDelay)
      .tap(unqueueCall)

    return result
  }
}
