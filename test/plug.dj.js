const test = require('tape')
const got = require('got')

test('plug.dj is reachable', (t) => {
  t.plan(1)

  got('https://plug.dj/').then((response) => {
    if (response.body.indexOf('<title>maintenance') !== -1) {
      t.fail('plug.dj is currently in maintenance mode.')
    } {
      t.pass('plug.dj is reachable')
    }
  }).catch((err) => t.fail(err.message))
})
