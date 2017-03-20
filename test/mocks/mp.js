const Promise = require('bluebird')
const miniplug = require('../../')

module.exports = () => {
  const mp = miniplug({
    connect: false
  })

  mp.connected = Promise.resolve({
    cookie: 'Fake Cookie'
  })

  return mp
}
