const OpenAPIBackend = require('openapi-backend').default
const express = require('express')
const backend = require('./lib/backend')
const { deconstruct, verifyToken, createToken } = require('./lib/credentials')

const app = express()
app.use(express.json())
app.use('/spec', express.static('spec'))
app.use('/', express.static('public'))

// define api
const api = new OpenAPIBackend({ definition: './spec/skolplattformen-1.0.0.yaml' })

// TODO: check jwt secret if prod

// register default handlers
api.register({
  notFound: async (c, req, res) => res.status(404).json({ err: 'not found' }),
  unauthorizedHandler: async (c, req, res) => res.status(401).json({ err: 'unauthorized' }),
})

// register security handler for jwt auth
api.registerSecurityHandler('bearerAuth', (c, req, res) => {
  try {
    const { cookie } = verifyToken(c)
    return cookie
  } catch (err) {
    const {message, stack} = err
    res.status(500).json({message, stack})
  }
})

// register operation handlers
api.register({
  login: async (c, req, res) => {
    try {
      console.log('login initiated')
      const { socialSecurityNumber } = deconstruct(c)
      const token = await backend.login(socialSecurityNumber)
      return res.status(200).json(token)
    } catch (err) {
      return res.status(err.status || 500).json({ message: err.message, stack: err.stack })
    }
  },
  waitForToken: async (c, req, res) => {
    console.log('wait for token')
    const { order } = deconstruct(c)

    const cookie = await backend.waitForToken({order})
    const token = createToken(cookie)
    console.log('login succeeded')
    return res.status(200).json({token})
  },
  getChildren: async (c, req, res) => {
    console.log('get children')
    const { cookie } = deconstruct(c)

    try {
      const children = await backend.getChildren(cookie)
      return res.status(200).json(children)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  getChildById: async (c, req, res) => {
    const { cookie, childId } = deconstruct(c)
    try {
      const child = await backend.getChildById(childId, cookie)
      return res.status(200).json(child)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  getNews: async (c, req, res) => {
    const { cookie, childId } = deconstruct(c)
    const news = await backend.getNews(childId, cookie)
    return res.status(200).json(news)
  },
  getCalendar: async (c, req, res) => {
    const { cookie, childId } = deconstruct(c)
    const calendar = await backend.getCalendar(childId, cookie)
    return res.status(200).json(calendar)
  },
  getNotifications: async (c, req, res) => {
    const { cookie, childSdsId } = deconstruct(c)
    const notifications = await backend.getNotifications(childSdsId, cookie)
    return res.status(200).json(notifications)
  },
  getMenu: async (c, req, res) => {
    const { cookie, childId } = deconstruct(c)
    const menu = await backend.getMenu(childId, cookie)
    return res.status(200).json(menu)
  },
  getSchedule: async (c, req, res) => {
    const { cookie, childSdsId } = deconstruct(c)
    const schedule = await backend.getSchedule(childSdsId, cookie)
    return res.status(200).json(schedule)
  },
  getClassmates: async (c, req, res) => {
    const { cookie, childSdsId } = deconstruct(c)
    const classmates = await backend.getClassmates(childSdsId, cookie)
    return res.status(200).json(classmates)
  },
  download: async (c, req, res) => {
    const { cookie, url } = deconstruct(c)
    const stream = await backend.download(url, cookie)
    stream.body.pipe(res.body)
  }
  
})

api.init()
// use as express middleware
app.use((req, res) => api.handleRequest(req, req, res))

// start server
const server = app.listen(process.env.PORT || 9000, () => console.info(`api listening at http://localhost:${process.env.PORT || 9000}`))

server.setTimeout(process.env.REQUEST_TIMEOUT || 200 * 1000)
