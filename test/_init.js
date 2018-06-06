const Test = require('tape/lib/test')
const isAsyncSupported = require('is-async-supported')

/**
 * Set up ES-future compilation.
 */

if (!isAsyncSupported()) {
  require('async-to-gen/register')
}

/**
 * Monkeypatch support for returning Promises from Tape tests. Mostly just
 * copied some code from Tape.
 */

Test.prototype.run = function () {
  if (this._skip) {
    this.comment(`SKIP ${this.name}`)
  }
  if (!this._cb || this._skip) {
    return this._end()
  }
  if (this._timeout != null) {
    this.timeoutAfter(this._timeout)
  }
  this.emit('prerun')

  // Start custom code
  const result = this._cb(this)
  if (result && result.then) {
    result.then(
      () => this.end(),
      (err) => {
        err ? this.error(err) : this.fail(err)
        this.end()
      }
    )
  }
  // End custom code

  this.emit('run')
}
