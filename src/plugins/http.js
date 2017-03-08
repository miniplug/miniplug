import got from 'got'
import createDebug from 'debug'

const debug = createDebug('miniplug:http')

export default function httpPlugin (httpOpts) {
  httpOpts = {
    backoff: (fn) => fn,
    ...httpOpts
  }

  return (mp) => {
    const request = httpOpts.backoff(
      // wait until connections are complete before sending off requests
      (url, opts) => mp.connected
        .tap(() => debug(opts.method, url, opts.body || opts.query))
        .then((session) =>
          got(`${httpOpts.host}/_/${url}`, {
            headers: {
              cookie: session.cookie,
              'content-type': 'application/json'
            },
            json: true,
            ...opts,
            body: opts.body ? JSON.stringify(opts.body) : undefined
          })
        )
        .then((resp) => {
          if (resp.body.status !== 'ok') {
            throw new Error(resp.body.data.length ? resp.body.data[0] : resp.body.status)
          }
          return resp.body.data
        })
    )

    const post = (url, data) => request(url, { method: 'post', body: data })
    const get = (url, data) => request(url, { method: 'get', query: data })
    const put = (url, data) => request(url, { method: 'put', body: data })
    const del = (url, data) => request(url, { method: 'delete', body: data })

    mp.request = request
    mp.post = post
    mp.get = get
    mp.put = put
    mp.del = del
  }
}
