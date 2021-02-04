import { Api } from './api'
import { FetcherOptions } from './fetcher'
import { AsyncishFunction, Fetch } from './types'

export { Api, FetcherOptions }
export * from './types'

export default function init(fetch: Fetch, clearCookies: AsyncishFunction, options?: FetcherOptions): Api {
  return new Api(fetch, clearCookies, options)
}
