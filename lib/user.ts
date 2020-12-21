import routes from './routes'
import { user as _user } from './parse'
import { Fetch, RequestInit } from './types'

export const user = (fetch: Fetch, init?: RequestInit) => async (): Promise<any> => {
  const url = routes.user
  const response = await fetch(url, init)
  const data = await response.json()
  return _user(data)
}
