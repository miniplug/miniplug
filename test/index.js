const isAsyncSupported = require('is-async-supported')

/**
 * Set up ES-future compilation.
 */

if (!isAsyncSupported()) {
  require('async-to-gen/register')
}

require('./booth')
require('./rooms')
require('./users')
require('./waitlist')
