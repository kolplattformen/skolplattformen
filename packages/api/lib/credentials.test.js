const { deconstruct } = require('./credentials')

describe('credentials', () => {
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
          bearerAuth: 'bearerAuth'
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