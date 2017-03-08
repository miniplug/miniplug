const Promise = require('bluebird')
const miniplug = require('../../')

module.exports = function () {
  const mp = miniplug({
    connect: false
  })

  mp.connected = Promise.resolve({
    cookie: 'Fake Cookie'
  })

  return mp
}
