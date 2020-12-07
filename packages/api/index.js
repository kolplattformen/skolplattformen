const OpenAPIBackend = require('openapi-backend').default
const express = require('express')
const jwt = require('jsonwebtoken')
const backend = require('./lib/backend')

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
  const authHeader = c.request.headers['authorization']
  if (!authHeader) {
    throw new Error('Missing authorization header')
  }
  const token = authHeader.replace('Bearer ', '')
  return jwt.verify(token, process.env.JWT_SECRET || 'secret')
})

// register operation handlers
api.register({
  login: async (c, req, res) => {
    console.log('token', c.request.query)
    const token = await backend.login(c.request.query.socialSecurityNumber)
    return res.status(200).json(token)
  },
  waitForToken: async (c, req, res) => {
    const order = c.request.params.order
    const cookie = await backend.waitForToken({order})
    const jwtToken = jwt.sign(cookie, process.env.JWT_SECRET || 'secret')
    return res.status(200).json(jwtToken)
  },
  getChildren: async (c, req, res) => {
    const cookie = c.security.bearerAuth
    try {
      const children = await backend.getChildren(cookie)
      return res.status(200).json(children)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  getChildById: async (c, req, res) => {
    const cookie = c.security.bearerAuth
    const childId = c.request.params.childId
    try {
      const child = await backend.getChildById(childId, cookie)
      return res.status(200).json(child)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  getNews: async (c, req, res) => {
    const cookie = c.security.bearerAuth
    const childId = c.request.params.order
    const news = await backend.getNews(childId, cookie)
    return res.status(200).json(news)
  },
  getCalendar: async (c, req, res) => {
    const cookie = c.security.bearerAuth
    const childId = c.request.params.order
    const calendar = await backend.getCalendar(childId, cookie)
    return res.status(200).json(calendar)
  },
  getNotifications: async (c, req, res) => {
    const cookie = c.security.bearerAuth
    const childId = c.request.params.order
    const notifications = await backend.getNotifications(childId, cookie)
    return res.status(200).json(notifications)
  },
  getMenu: async (c, req, res) => {
    const cookie = c.security.bearerAuth
    const childId = c.request.params.order
    const menu = await backend.getMenu(childId, cookie)
    return res.status(200).json(menu)
  },
  getSchedule: async (c, req, res) => {
    const cookie = c.security.bearerAuth
    const childId = c.request.params.order
    const schedule = await backend.getSchedule(childId, cookie)
    return res.status(200).json(schedule)
  },
  download: async (c, req, res) => {
    const cookie = c.security.bearerAuth
    const url = c.request.query.url
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
