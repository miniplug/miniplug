const { test } = require('tape-modern')
const miniplug = require('./mocks/mp')

test('Sets booth and waitlist information on `advance`', (t) => {
  const mp = miniplug()

  mp.ws.emit('userJoin', { id: 4393540 })

  mp.ws.receiveMessages([
    {
      a: 'advance',
      p: {
        c: 4393540,
        d: [4710422, 6104576, 9416674, 10002416],
        h: '5b65e0b5-4316-4859-97d5-96ece791121f',
        m: {
          author: 'K.vsh ',
          format: 1,
          image: 'https://i.ytimg.com/vi/93u4rqfBk9w/default.jpg',
          cid: '93u4rqfBk9w',
          duration: 232,
          title: 'Hello (ft. Summer soul)',
          id: 329859640
        },
        p: 10077201,
        t: '2017-04-13 07:15:50.048689'
      },
      s: 'reanna'
    }
  ])

  t.ok(mp.dj())
  t.ok(mp.waitlist())
  t.ok(mp.media())
  t.equal(mp.dj().id, 4393540)
  t.equal(mp.media().author, 'K.vsh ')
  t.equal(mp.media().title, 'Hello (ft. Summer soul)')
  t.equal(mp.waitlist().length, 4)

  mp.ws.receiveMessages([
    {
      a: 'advance',
      p: {},
      s: 'reanna'
    }
  ])

  t.equal(mp.dj(), null)
  t.equal(mp.waitlist().length, 0)
  t.equal(mp.media(), null)

  mp.ws.close()
})
