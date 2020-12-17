const jwt = require('jsonwebtoken')
const moment = require('moment')
const { encrypt, decrypt } = require('./crypto')

const deconstruct = (c) => {
  const result = {}
  if (c.security && c.security.bearerAuth) {
    result.cookie = decrypt(c.security.bearerAuth)
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

const verifyToken = (c) => {
  try {
    const { authorization } = deconstruct(c)
    if (!authorization) {
      throw new Error('Missing authorization header')
    }
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET || 'secret')
    return decoded
  } catch (err) {
    throw err
  }
}

const createToken = (cookie) => {
  const objectified = cookie
    .split('; ')
    .map((slug) => slug.split('='))
    .reduce((obj, [key, val]) => ({...obj, [key]: val}), {})
  const options = {}
  if (objectified.expires) {
    options.expiresIn = moment(new Date(objectified.expires)).unix() - moment().unix()
  }
  
  return jwt.sign({
    cookie: encrypt(cookie)
  }, process.env.JWT_SECRET || 'secret', options)
}

module.exports = {
  createToken,
  deconstruct,
  verifyToken
}
