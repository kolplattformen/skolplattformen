import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { list } from './children'
import { checkStatus, getCookies, login } from './login'
import { EventEmitter } from 'events'

const pause = async (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

const emitter = new EventEmitter()
const init = () => {
  const config: AxiosRequestConfig = {
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.87 Safari/537.36'
    },
    maxRedirects: 0,
    withCredentials: true
  }
  const client = axios.create(config)
  let cookies: any = {}

  client.interceptors.request.use((config) => {
    console.log('request', config.method, config.url)
    config.headers.Cookie = Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ')
    return config
  })
  client.interceptors.response.use((response) => {
    console.log('response', response.status, response.statusText, response.headers['set-cookie'])
    if (response.headers['set-cookie']) {
      const setCookies: string[] = response.headers['set-cookie']
      setCookies.map((c) => c.split('=')).forEach(([key, value]) => cookies[key] = value)
    }
    return response
  })

  return {
    ...emitter,
    login: async (personalNumber: string) => {
      const ticket = await login(client)(personalNumber)
      await pause(1000)
      const check = checkStatus(client)(ticket)
      check.on('OK', async () => {
        console.log('get cookie')
        const newCookies = await getCookies(client)()
        cookies = {...cookies, ...newCookies}
        console.log(cookies)

        emitter.emit('login')
      })
      return check
    },
    getChildren: async () => {
      const result = await list(client)()
      return result
    },
  }
}

export default init
