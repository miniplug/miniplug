const got = require('got')

describe('plug.dj', () => {
  it('is reachable', () => {
    return got('https://plug.dj/').then((response) => {
      if (response.body.indexOf('<title>maintenance') !== -1) {
        throw new Error('plug.dj is currently in maintenance mode.')
      }
    })
  })
})
