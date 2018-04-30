import fetch from 'node-fetch'
import createDebug from 'debug'
import https from 'https'
import { wrapResponseError } from '../errors'

const { Agent } = https
const debug = createDebug('miniplug:http')

export default function httpPlugin (httpOpts) {
  httpOpts = Object.assign({
    backoff: (fn) => fn,
    agent: httpOpts.agent || new Agent({ keepAlive: true })
  }, httpOpts)

  return (mp) => {
    const request = httpOpts.backoff(
      // wait until connections are complete before sending off requests
      (url, opts) => mp.connected
        .tap(() => debug(opts.method, url, opts.body || opts.query))
        .then((session) =>
          fetch(`${httpOpts.host}/_/${url}`, Object.assign({
            agent: httpOpts.agent,
            headers: {
              cookie: session.cookie,
              'content-type': 'application/json'
            }
          }, opts, {
            body: opts.body ? JSON.stringify(opts.body) : undefined
          }))
        )
        .then((response) => {
          return response.json().then((body) => {
            if (!response.ok || body.status !== 'ok') {
              throw Object.assign(new Error(
                body.data && body.data.length
                  ? body.data[0]
                  : body.status
              ), { response })
            }
            return body.data
          })
        })
        .catch((err) => {
          if (err && err.response) {
            throw wrapResponseError(err.response, err)
          }
          throw err
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
