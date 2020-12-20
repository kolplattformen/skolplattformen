import { AxiosAdapter, AxiosInstance } from 'axios'
import routes from './routes'
import { Child } from './types'

export const list = (client: AxiosInstance) => async (): Promise<Child[]> => {
  const url = routes.children
  const response = await client.get(url)
  return response.data
}

export const details = (client: AxiosAdapter) => async (id: string): Promise<Child> => ({})
