const moment = require('moment')
const { inspect } = require('util')
const nodeFetch = require('node-fetch')
const { CookieJar } = require('tough-cookie')
const fetchCookie = require('fetch-cookie/node-fetch')

const init = require('./dist').default

const [, , personalNumber] = process.argv

if (!personalNumber) {
  console.error('You must pass in a valid personal number, eg `node run 197001011111`')
  process.exit(1)
}

async function run() {
  const cookieJar = new CookieJar()
  const fetch = fetchCookie(nodeFetch, cookieJar)

  try {

    const api = init(fetch, () => cookieJar.removeAllCookies())
    const status = await api.login(personalNumber)
    status.on('PENDING', () => console.log('PENDING'))
    status.on('USER_SIGN', () => console.log('USER_SIGN'))
    status.on('ERROR', () => console.error('ERROR'))
    status.on('OK', () => console.log('OK'))

    api.on('login', async () => {
      console.log('Logged in')

      console.log('children')
      const children = await api.getChildren()
      console.log(inspect(children, false, 10, true))

      console.log('calendar')
      const calendar = await api.getCalendar(children[0])
      console.log(inspect(calendar, false, 10, true))

      console.log('classmates')
      const classmates = await api.getClassmates(children[0])
      console.log(inspect(classmates, false, 10, true))

      console.log('schedule')
      const schedule = await api.getSchedule(children[0], moment().subtract(1, 'week'), moment())
      console.log(inspect(schedule, false, 10, true))

      console.log('news')
      const news = await api.getNews(children[0])
      console.log(inspect(news, false, 10, true))

      await api.logout()
    })

    api.on('logout', () => {
      console.log('Logged out')
      process.exit(0)
    })
  } catch (err) {
    console.error(err)
  }
}

run()
