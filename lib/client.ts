import { Auth } from './types'

export interface Client {
  post: (url: string) => Promise<Auth>
}

export const create = (): Client => async (url: string) => {
  const init: RequestInit = {
    method: 'POST',
  }
  const response = await fetch(url, init)
}
