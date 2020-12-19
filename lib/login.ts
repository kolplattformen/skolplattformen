import { Client } from './client'
import routes from './routes'
import { Auth } from './types'

export const login = (client: Client) => async (
  personalNumber: string,
): Promise<Auth> => {
  const url = routes.login(personalNumber)
  const result = await client.post(url)
  const { token } = await result.json()
  return { token }
}
