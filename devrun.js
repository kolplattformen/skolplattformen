/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

/**
 * A more elaborated test file for local development
 * - Support for proxy (i recommend Burp Suite https://portswigger.net/burp/communitydownload)
 * - Saves sessionCoookie to a file and tries to use it again
 */
const nodeFetch = require('node-fetch')
const { CookieJar } = require('tough-cookie')
const fetchCookie = require('fetch-cookie/node-fetch')
// eslint-disable-next-line import/no-unresolved
const { writeFile, readFile } = require('fs/promises')
const path = require('path')
const fs = require('fs')
const HttpProxyAgent = require('https-proxy-agent')
const agentWrapper = require('./agentFetchWrapper')
const init = require('./dist').default

const [, , personalNumber] = process.argv
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const cookieJar = new CookieJar()
let bankIdUsed = false

async function run() {
  const agent = new HttpProxyAgent('http://localhost:8080')
  const agentEnabledFetch = agentWrapper(nodeFetch, agent)

  const fetch = fetchCookie(agentEnabledFetch, cookieJar)

  try {
    const api = init(fetch, cookieJar, { record })

    api.on('login', async () => {
      console.log('Logged in')

      if (bankIdUsed) {
        const sessionCookie = getSessionCookieFromCookieJar()
        ensureDirectoryExistence('./record')
        await writeFile('./record/latestSessionCookie.txt', JSON.stringify(sessionCookie))
        console.log('Session cookie saved to file ./record/latesSessionCookie.txt')
      }
      console.log('user')
      const user = await api.getUser()
      console.log(user)
      /*
      console.log('children')
      const children = await api.getChildren()
      console.log(children)
/*
      console.log('calendar')
      const calendar = await api.getCalendar(children[0])
      console.log(calendar)

      console.log('classmates')
      const classmates = await api.getClassmates(children[0])
      console.log(classmates)

      console.log('schedule')
      const schedule = await api.getSchedule(children[0], DateTime.local(), DateTime.local().plus({ week: 1 }))
      console.log(schedule)

      console.log('news')
      const news = await api.getNews(children[0])
*/
      /* console.log('news details')
      const newsItems = await Promise.all(
        news.map((newsItem) =>
          api.getNewsDetails(children[0], newsItem)
            .catch((err) => { console.error(newsItem.id, err) })
        )
      )
      console.log(newsItems) */

      /* console.log('menu')
      const menu = await api.getMenu(children[0])
      console.log(menu) */

      // console.log('notifications')
      // const notifications = await api.getNotifications(children[0])
      // console.log(notifications)

      await api.logout()
    })

    api.on('logout', () => {
      console.log('Logged out')
      process.exit(0)
    })

    // Eventhandlers above must be setup before calling login
    bankIdUsed = await Login(api)
  } catch (err) {
    console.error(err)
  }
}

async function Login(api) {
  let useBankId = true

  try {
    console.log('Attempt to use saved session cookie to login')
    const rawContent = await readFile('./record/latestSessionCookie.txt')
    const sessionCookie = JSON.parse(rawContent)

    await api.setSessionCookie(`${sessionCookie.key}=${sessionCookie.value}`)

    useBankId = false
    console.log('Login with old cookie succeeded')
  } catch (error) {
    console.log('Could not login with old session cookie. Reverting to BankId')
    console.error(error)
  }

  if (useBankId) {
    console.log('*** BankId login - open BankId app ***')
    if (!personalNumber) {
      console.error('You must pass in a valid personal number, eg `node run 197001011111`')
      process.exit(1)
    }
    const status = await api.login(personalNumber)
    status.on('PENDING', () => console.log('PENDING'))
    status.on('USER_SIGN', () => console.log('USER_SIGN'))
    status.on('ERROR', () => console.error('ERROR'))
    status.on('OK', () => console.log('OK'))
    status.on('CANCELLED', () => {
      console.log('User cancelled login')
      process.exit(0)
    })
  }
  return useBankId
}

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}

function getSessionCookieFromCookieJar() {
  const cookies = cookieJar.getCookiesSync('https://etjanst.stockholm.se')
  const sessionCookie = cookies.find((c) => c.key === 'SMSESSION')
  return sessionCookie
}

const record = async (info, data) => {
  const name = info.error ? `${info.name}_error` : info.name
  const filename = `./record/${name}.json`
  ensureDirectoryExistence(filename)
  const content = {
    url: info.url,
    headers: info.headers,
    status: info.status,
    statusText: info.statusText,
  }
  if (data) {
    switch (info.type) {
      case 'json':
        content.json = data
        break
      case 'text':
        content.text = data
        break
      case 'blob': {
        const buffer = await data.arrayBuffer()
        content.blob = Buffer.from(buffer).toString('base64')
        break
      }
      default:
        throw new Error('Unknown data type')
    }
  } else if (info.error) {
    const { message, stack } = info.error
    content.error = {
      message,
      stack,
    }
  }
  await writeFile(filename, JSON.stringify(content, null, 2))
}

// Hack to keep it running while wating for await
const timer = setTimeout(() => {}, 999999)

run()
  .then(() => {
    clearTimeout(timer)
    console.log('...')
  })
  .catch((err) => {
    clearTimeout(timer)
    console.error(err)
  })
