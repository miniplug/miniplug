import request from 'request'

describe('plug.dj', () => {
  it('is reachable', (done) => {
    request('https://plug.dj/', (e, resp, body) => {
      if (e) {
        throw e
      }
      if (body.indexOf('<title>maintenance') !== -1) {
        throw new Error('plug.dj is currently in maintenance mode.')
      }
      done()
    })
  })
})
