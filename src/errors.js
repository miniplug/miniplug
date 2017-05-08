import createErrorClass from 'create-error-class'

function setup (response, cause) {
  this.message = response.body.data
    && response.body.data[0]
    || cause.message
  this.status = response.body.status
  this.response = response
  this.cause = cause
}

function setupFundsPP (response, cause) {
  setup.call(this, response, cause)
  this.message = 'You don\'t have enough Plug Points to unlock this.'
}

const RequestError = createErrorClass('RequestError', setup)
const BadLoginError = createErrorClass('BadLoginError', setup)
const NotAuthorizedError = createErrorClass('NotAuthorizedError', setup)
const NotFoundError = createErrorClass('NotFoundError', setup)
const NoValidPlaylistError = createErrorClass('NoValidPlaylistError', setup)
const NotEnoughPPError = createErrorClass('NotEnoughPPError', setupFundsPP)

const statusToError = {
  requestError: RequestError,
  badLogin: BadLoginError,
  notAuthorized: NotAuthorizedError,
  notFound: NotFoundError,
  noValidPlaylist: NoValidPlaylistError,
}

export const errorClasses = {
  RequestError,
  BadLoginError,
  NotAuthorizedError,
  NotFoundError,
  NoValidPlaylistError,
  NotEnoughPPError
}

export function wrapResponseError(response, cause) {
  const { status, data } = response.body
  // Special cases
  if (status === 'requestError' && data && data[0] === 'fundsPP') {
    return new NotEnoughPPError(response, cause)
  }

  const ErrorClass = statusToError[status]
  if (ErrorClass) {
    return new ErrorClass(response, cause)
  }
  setup.call(cause, response, cause)
  return cause
}
