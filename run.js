function requestLogger(httpModule) {
  var original = httpModule.request
  httpModule.request = function (options, callback) {
    console.log('-----------------------------------------------')
    console.log(
      options.href || options.proto + '://' + options.host + options.path,
      options.method
    )
    console.log(options.headers)
    console.log('-----------------------------------------------')
    return original(options, callback)
  }
}

requestLogger(require('http'))
requestLogger(require('https'))

const { DateTime } = require('luxon')
const nodeFetch = require('node-fetch')
const { CookieJar } = require('tough-cookie')
const fetchCookie = require('fetch-cookie/node-fetch')
const { writeFile } = require('fs/promises')
const path = require('path')
const fs = require('fs')
const { inspect } = require('util')

const init = require('./dist').default

const [, , personalNumber] = process.argv

if (!personalNumber) {
  console.error(
    'You must pass in a valid personal number, eg `node run 197001011111`'
  )
  process.exit(1)
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
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
      case 'blob':
        const buffer = await data.arrayBuffer()
        content.blob = Buffer.from(buffer).toString('base64')
        break
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

async function run() {
  const cookieJar = new CookieJar()
  const fetch = fetchCookie(nodeFetch, cookieJar)

  try {
    const api = init(fetch, cookieJar, { record })
    const status = await api.login(personalNumber)
    status.on('PENDING', () => console.log('PENDING'))
    status.on('USER_SIGN', () => console.log('USER_SIGN'))
    status.on('ERROR', () => console.error('ERROR'))
    status.on('OK', () => console.log('OK'))
    status.on('CANCELLED', () => {
      console.log('User cancelled login')
      process.exit(0)
    })

    api.on('login', async () => {
      console.log('Logged in')

      // console.log('user')
      // const user = await api.getUser()
      // console.log(user)

      console.log('children')
      const children = await api.getChildren()
      console.log(children)
      
      console.log('calendar')
      const calendar = await api.getCalendar(children[0])
      console.log(calendar)
/*
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

      const skola24children = await api.getSkola24Children()
      console.log(skola24children)

      console.log('timetable')
      const timetable = await api.getTimetable(skola24children[0], 15, 2021)
      console.log(inspect(timetable, false, 1000, true))

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
