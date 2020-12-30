import wrap, { CallInfo, Fetcher, Recorder } from './fetcher'
import { Fetch, Headers, Response } from './types'
const Blob = require('node-blob')
Blob.prototype.arrayBuffer = async function () {
  return this.buffer.buffer
}

describe('fetcher', () => {
  let fetch: jest.Mocked<Fetch>
  let response: jest.Mocked<Response>
  let headers: jest.Mocked<Headers>
  let fetcher: Fetcher
  beforeEach(() => {
    headers = { get: jest.fn() }
    response = {
      ok: true,
      status: 200,
      statusText: 'ok',
      json: jest.fn(),
      text: jest.fn(),
      blob: jest.fn(),
      headers,
    }
    fetch = jest.fn().mockResolvedValue(response)
    fetcher = wrap(fetch)
  })
  it('calls fetch', async () => {
    await fetcher('foo', '/')
    expect(fetch).toHaveBeenCalledWith('/', expect.any(Object))
  })
  it('json returns the result', async () => {
    const data = { foo: 'bar' }
    response.json.mockResolvedValue(data)

    const res = await fetcher('foo', '/')
    const result = await res.json()

    expect(result).toEqual(data)
  })
  it('text returns the result', async () => {
    const data = 'Hello World!'
    response.text.mockResolvedValue(data)

    const res = await fetcher('foo', '/')
    const result = await res.text()

    expect(result).toEqual(data)
  })
  it('blob returns the result', async () => {
    const data = new Blob()
    response.blob.mockResolvedValue(data)

    const res = await fetcher('foo', '/')
    const result = await res.blob()

    expect(result).toEqual(data)
  })
  describe('record', () => {
    let recorder: Recorder
    let expectedInfo: CallInfo
    beforeEach(() => {
      recorder = jest.fn().mockResolvedValue(undefined)
      fetcher = wrap(fetch, { record: recorder })
      expectedInfo = {
        name: 'foo',
        type: '',
        url: '/',
        headers: expect.any(Object),
        status: 200,
        statusText: 'ok',
      }
    })
    it('records with the correct parameters for json', async () => {
      response.json.mockResolvedValue({})

      await (await fetcher('foo', '/')).json()

      expectedInfo.type = 'json'
      const expectedData = {}
      expect(recorder).toHaveBeenCalledWith(expectedInfo, expectedData)
    })
    it('records with the correct parameters for text', async () => {
      response.text.mockResolvedValue('Hello')

      await (await fetcher('foo', '/')).text()

      expectedInfo.type = 'text'

      const expectedData = 'Hello'
      expect(recorder).toHaveBeenCalledWith(expectedInfo, expectedData)
    })
    it('records with the correct parameters for blob', async () => {
      const data = new Blob('Hello')
      response.blob.mockResolvedValue(data)

      await (await fetcher('foo', '/')).blob()

      expectedInfo.type = 'blob'

      expect(recorder).toHaveBeenCalledWith(expectedInfo, data)
    })
  })
})
