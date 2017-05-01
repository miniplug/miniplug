import createErrorClass from 'create-error-class'

function setup (response, cause) {
  this.message = response.body.data
    && response.body.data[0]
    || cause.message
  this.status = response.body.status
  this.response = response
  this.cause = cause
}

export const RequestError = createErrorClass('RequestError', setup)
export const NotAuthorizedError = createErrorClass('NotAuthorizedError', setup)
export const NotFoundError = createErrorClass('NotFoundError', setup)
export const NoValidPlaylistError = createErrorClass('NoValidPlaylistError', setup)

const statusToError = {
  requestError: RequestError,
  notAuthorized: NotAuthorizedError,
  notFound: NotFoundError,
  noValidPlaylist: NoValidPlaylistError,
}

export function wrapResponseError(response, cause) {
  const { status, data } = response.body
  const ErrorClass = statusToError[status]
  if (ErrorClass) {
    return new ErrorClass(response, cause)
  }
  setup.call(cause, response, cause)
  return cause
}
