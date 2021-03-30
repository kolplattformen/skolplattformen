import { Fetch, RequestInit, Response } from './types'

export interface CallInfo extends RequestInit {
  name: string
  type: string
  url: string
  status: number
  statusText: string
  error?: Error
}

export interface FetcherOptions {
  record?: (
    info: CallInfo,
    data: string | Blob | ArrayBuffer | any
  ) => Promise<void>
}

export interface Fetcher {
  (name: string, url: string, init?: RequestInit): Promise<Response>
}

export interface Recorder {
  (info: CallInfo, data: string | Blob | ArrayBuffer | any): Promise<void>
}

const record = async (
  name: string,
  url: string,
  init: RequestInit | undefined,
  type: string,
  options: FetcherOptions,
  response: Response,
  data: string | ArrayBuffer | Blob | any
): Promise<void> => {
  if (!options.record) {
    return
  }
  const info: CallInfo = {
    ...(init || {}),
    name,
    url,
    type,
    status: response.status,
    statusText: response.statusText,
  }
  await options.record(info, data)
}

export default function wrap(
  fetch: Fetch,
  options: FetcherOptions = {}
): Fetcher {
  return async (
    name: string,
    url: string,
    init: RequestInit = { headers: {} }
  ): Promise<Response> => {
    const config = {
      ...init,
      headers: {
        'User-Agent':
          // eslint-disable-next-line max-len
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
        ...init.headers,
      },
    }
    const response = await fetch(url, config)

    const wrapMethod = (res: Response, methodName: string): void => {
      // @ts-ignore
      const original = res[methodName].bind(res)
      // @ts-ignore
      res[methodName] = async (...args) => {
        const result = await original(...args)
        await record(name, url, config, methodName, options, response, result)
        return result
      }
    }
    wrapMethod(response, 'json')
    wrapMethod(response, 'text')

    return response
  }
}
