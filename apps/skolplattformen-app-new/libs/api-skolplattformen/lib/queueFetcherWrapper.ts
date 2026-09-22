import QueueFetcher from './queue/queueFetcher'
import { Fetcher, RequestInit, Response } from '@skolplattformen/api'

export default function queueFetcherWrapper(
  fetch: Fetcher,
  changeChildFunc: (childId: string) => Promise<Response>
): Fetcher {
  const queue = new QueueFetcher(changeChildFunc)
  queue.verboseDebug = false

  return async (
    name: string,
    url: string,
    init: RequestInit = { headers: {} },
    childId?: string
  ): Promise<Response> => {
    if (childId === undefined) {
      return fetch(name, url, init)
    }

    const p = queue.fetch(() => fetch(name, url, init), childId)
    return p
  }
}
