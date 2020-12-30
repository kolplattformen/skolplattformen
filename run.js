const moment = require('moment')
const nodeFetch = require('node-fetch')
const { CookieJar } = require('tough-cookie')
const fetchCookie = require('fetch-cookie/node-fetch')
const { writeFile } = require('fs/promises')

const init = require('./dist').default

const [, , personalNumber] = process.argv

if (!personalNumber) {
  console.error('You must pass in a valid personal number, eg `node run 197001011111`')
  process.exit(1)
}

const record = async (info, data) => {
  const filename = `./record/${info.name}.json`
  const content = {
    url: info.url,
    headers: info.headers,
    status: info.status,
    statusText: info.statusText,
  }
  switch (info.type) {
    case 'json':
      content.json = data
      break
    case 'text':
      content.text = data
      break
    case 'blob':
      const buffer = await data.arrayBuffer()
      content.blob = Buffer.from(buffer).toString('base64')
      break
  }
  await writeFile(filename, JSON.stringify(content, null, 2))
}

async function run() {
  const cookieJar = new CookieJar()
  const fetch = fetchCookie(nodeFetch, cookieJar)

  try {

    const api = init(fetch, () => cookieJar.removeAllCookies(), { record })
    const status = await api.login(personalNumber)
    status.on('PENDING', () => console.log('PENDING'))
    status.on('USER_SIGN', () => console.log('USER_SIGN'))
    status.on('ERROR', () => console.error('ERROR'))
    status.on('OK', () => console.log('OK'))

    api.on('login', async () => {
      console.log('Logged in')

      console.log(api.getSessionCookie())

      console.log('user')
      const user = await api.getUser()
      // console.log(user)

      console.log('children')
      const children = await api.getChildren()
      // console.log(children)

      console.log('calendar')
      const calendar = await api.getCalendar(children[0])
      // console.log(calendar)

      console.log('classmates')
      const classmates = await api.getClassmates(children[0])
      // console.log(classmates)

      console.log('schedule')
      const schedule = await api.getSchedule(children[0], moment().subtract(1, 'week'), moment())
      // console.log(schedule)

      console.log('news')
      const news = await api.getNews(children[0])
      // console.log(news)

      console.log('image')
      const blob = await api.getImage(news[0].imageUrl)
      // console.log(blob)

      // const arrayBuffer = await blob.arrayBuffer()
      // console.log(`data:${blob.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`)

      console.log('menu')
      const menu = await api.getMenu(children[0])
      // console.log(menu)

      console.log('notifications')
      const notifications = await api.getNotifications(children[0])
      // console.log(notifications)

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
