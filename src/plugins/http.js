import got from 'got'
import createDebug from 'debug'
import { Agent } from 'https'
import { wrapResponseError } from '../errors'

const debug = createDebug('miniplug:http')

export default function httpPlugin (httpOpts) {
  httpOpts = Object.assign({
    backoff: (fn) => fn,
    agent: httpOpts.agent || new Agent({ keepAlive: true })
  }, httpOpts)

  return (mp) => {
    const request = httpOpts.backoff((url, opts) => {
      if (!mp.connected) {
        return Promise.reject(new Error('No connection available. Use mp.connect() before calling other functions.'))
      }

      // wait until connections are complete before sending off requests
      return mp.connected
        .tap(() => debug(opts.method, url, opts.body || opts.query))
        .then((session) =>
          got(`${httpOpts.host}/_/${url}`, Object.assign({
            agent: httpOpts.agent,
            headers: {
              cookie: session.cookie,
              'content-type': 'application/json'
            },
            json: true
          }, opts, {
            body: opts.body ? opts.body : undefined
          }))
        )
        .then((resp) => {
          if (resp.body.status !== 'ok') {
            throw new Error(resp.body.data.length ? resp.body.data[0] : resp.body.status)
          }
          return resp.body.data
        })
        .catch((err) => {
          if (err && err.response) {
            throw wrapResponseError(err.response, err)
          }
          throw err
        })
    })

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
