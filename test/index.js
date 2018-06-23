const { assert, done } = require('tape-modern')
const isAsyncSupported = require('is-async-supported')

/**
 * Set up ES-future compilation.
 */

if (!isAsyncSupported()) {
  require('async-to-gen/register')
}

assert.notOk = (value, message = 'should be falsy') => {
  assert.ok(!value, message)
}

require('./booth')
require('./rooms')
require('./users')
require('./waitlist')
