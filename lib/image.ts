import routes from './routes'
import { Fetch, RequestInit } from './types'

export const image = (fetch: Fetch, init?: RequestInit) => async (imageUrl: string): Promise<Blob> => {
  const url = routes.image(imageUrl)
  const response = await fetch(url, init)
  const data = await response.blob()
  return data
}
