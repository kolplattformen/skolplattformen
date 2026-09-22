import * as parse from '../'

let response: parse.EtjanstResponse

describe('etjanst', () => {
  beforeEach(() => {
    response = {
      Success: true,
      Error: null,
      Data: [
        {
          Name: 'Some name',
        },
      ],
    }
  })

  it('returns data on success', () => {
    expect(parse.etjanst(response)).toBeInstanceOf(Array)
  })

  it('throws error on Error', () => {
    response.Success = false
    response.Error = 'b0rk'
    expect(() => parse.etjanst(response)).toThrowError('b0rk')
  })

  it('camelCases data keys', () => {
    const parsed = parse.etjanst(response)
    expect(parsed[0].name).toEqual(response.Data[0].Name)
  })
})
