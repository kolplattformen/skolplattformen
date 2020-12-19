const jwt = require('jsonwebtoken')
const moment = require('moment')
const { createToken, deconstruct, verifyToken } = require('./credentials')
const { encrypt, decrypt } = require('./crypto')

describe('credentials', () => {
  describe('createToken', () => {
    let cookie, expires
    beforeEach(() => {
      process.env.JWT_SECRET = 'correct'

      expires = moment().add(1, 'd')
      const weirdFormatTimeString = expires.utc().format('ddd, DD-MMM-YYYY HH:mm:ss') + ' GMT'

      cookie = `SMSESSION=foobar; path=/; HttpOnly; SameSite=Lax, StockholmEServiceLanguage=1053,Svenska,Language,sv; expires=${weirdFormatTimeString}; path=/`
    })
    it('creates a jwt', () => {
      const token = createToken(cookie)

      expect(token.split('.')).toHaveLength(3)
    })
    it('stores cookie', () => {
      const token = createToken(cookie)
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      expect(decrypt(decoded.cookie)).toEqual(cookie)
    })
    it('sets expiry', () => {
      const token = createToken(cookie)
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      expect(decoded.exp).toEqual(expires.unix())
    })
  })
  describe('verifyToken', () => {
    let token, c, cookie
    beforeEach(() => {
      process.env.JWT_SECRET = 'correct'

      cookie = 'SMSESSION=foobar'
      token = jwt.sign({ cookie }, process.env.JWT_SECRET)
      c = {
        request: {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      }
    })
    it('throws if header is missing', () => {
      c.request.headers = {}
      expect(() => verifyToken(c)).toThrow('Missing authorization header')
    })
    it('throws if signature is wrong', () => {
      token = jwt.sign({ cookie }, 'wrong')
      c.request.headers.authorization = `Bearer ${token}`
      expect(() => verifyToken(c)).toThrow('invalid signature')
    })
    it('returns a jwt on successs', () => {
      const decoded = verifyToken(c)
      expect(decoded.cookie).toEqual(cookie)
    })
  })
  describe('deconstruct', () => {
    let c
    beforeEach(() => {
      c = {
        request: {
          headers: {
            authorization: 'Bearer authorization'
          },
          params: {
            order: 'abc-123',
            childId: 'childId',
            childSdsId: 'childSdsId'
          },
          query: {
            socialSecurityNumber: '200001019999',
            url: 'https://google.com'
          },
        },
        security: {
          bearerAuth: encrypt('bearerAuth')
        }
      }
    })
    it('returns all expected values', () => {
      expect(deconstruct(c)).toEqual({
        authorization: 'authorization',
        order: 'abc-123',
        childId: 'childId',
        childSdsId: 'childSdsId',
        socialSecurityNumber: '200001019999',
        cookie: 'bearerAuth',
        url: 'https://google.com'
      })
    })
  })
})
