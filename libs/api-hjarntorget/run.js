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
  const init = require('./dist/libs/api-hjarntorget/lib').default
  
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
          // eslint-disable-next-line no-case-declarations
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
      console.log("inited...")

      api.on('login', async () => {
        console.log("Logged in!")
        await api.getUser()
        const children = await api.getChildren()
        const now = DateTime.fromJSDate(new Date)
        for (let i = 0; i < children.length; i++) {
          const c = children[i];
          await api.getCalendar(c)
          await api.getNotifications(c)
          await api.getTimetable(c, 44, 2021, 'ignored')
        }
        const news = await api.getNews()
        // const news = await api.getNews()
        // //console.table(news.map(n => ({ id: n.id, author: n.author, published: n.published})))
        // //news.length && console.log(news[0])

        // const notifications = await api.getNotifications(children[2])
        // //const ns = notifications.map(n => ({id: n.id, sender: n.sender, type: n.type}))
        // //console.table(ns)
        // console.log("notifications count", notifications.length)
        // notifications.slice(0, 10).forEach(console.log)

        // await api.getCalendar(children[1])

        // await api.getTimetable(children[1], 38, 2021, "en")

        // await api.getClassmates()
        // console.table(schema)

      });
      const res = await api.login(personalNumber)
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }
  
  run()
  