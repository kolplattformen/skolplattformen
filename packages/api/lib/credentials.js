const deconstruct = (c) => {
  const result = {}
  if (c.security) {
    result.cookie = c.security.bearerAuth
  }
  if (c.request.headers) {
    if (c.request.headers.authorization) {
      result.authorization = c.request.headers.authorization.replace('Bearer ', '')
    }
  }
  if (c.request.params) {
    result.order = c.request.params.order
    result.childId = c.request.params.childId
    result.childSdsId = c.request.params.childSdsId
  }
  if (c.request.query) {
    result.socialSecurityNumber = c.request.query.socialSecurityNumber
    result.url = c.request.query.url
  }
  return result
}

module.exports = {
  deconstruct
}
