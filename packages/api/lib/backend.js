const nodeFetch = require('node-fetch')
const fetch = require('fetch-cookie/node-fetch')(nodeFetch)
const moment = require('moment')
const camel = require('camelcase-keys')
const h2m = require('h2m')
const {htmlDecode} = require('js-htmlencode')
const urls = require('./urls')

const download = (url, cookie) => fetch(url, {headers: {cookie}})

const fetchJson = (url, cookie) => {
  return fetch(url, {headers: {cookie}})
  .then(res => res.ok ? res : Promise.reject(res.statusText))
  .then(res => res.json())
  // convert to camelCase
  .then(json => camel(json, { deep: true }))
  .then(json => json.error ? Promise.reject(json.error) : json.data)
}
const pause = ms => new Promise((resolve) => setTimeout(resolve, ms))

const login = async (socialSecurityNumber) => {
  const url = urls.login(socialSecurityNumber)
  const token = await fetch(url).then(res => res.ok ? res.json() : Promise.reject(res.statusText))

  console.log('got tokens', token)
  return token
}

const waitForToken = async ({order}, tries = 60) => {
  if (!tries) return Promise.reject('Timeout')
  const status = await fetch(urls.checkStatus(order)).then(res => res.ok ? res.text() : res.statusText)
  if (status === 'OK') return await fetch(urls.loginTarget).then(res => res.ok && res.headers.get('set-cookie'))
  return pause(1000).then(() => waitForToken({order}, tries--))
}

const getChildren = (cookie) => fetchJson(urls.children, cookie).then(children => children.map(({name, id, status, schoolId}) => ({name, id, status, schoolId})))
const getNews = (childId, cookie) => fetchJson(urls.news(childId), cookie)
  .then(news => news.newsItems.map(({body, preamble: intro, header, bannerImageUrl: imageUrl, pubDateSE: published, modDateSE: modified}) => 
    ({header, intro, body: htmlDecode(h2m(body)), modified, published, imageUrl: urls.image(imageUrl) })))
  .catch(err => ({err}))

const getCalendar = (childId, cookie) => fetchJson(urls.calendar(childId), cookie)
  .then(({title, id, description, location, longEventDateTime: startDate, longEndDateTime: endDate, allDayEvent: allDay}) => ({title, id, description, location, startDate, endDate, allDay}))
  .catch(err => ({err}))

const getNotifications = (childId, cookie) => fetchJson(urls.notifications(childId), cookie).catch(err => ({err}))
const getMenu = (childId, cookie) => fetchJson(urls.menu(childId), cookie).catch(err => ({err}))
const getSchedule = (childId, cookie) => fetchJson(urls.schedule(childId, moment().startOf('day').toISOString(), moment().endOf('day').toISOString()), cookie)

const getChildById = async (childId, cookie) => {
  const children = await getChildren()
  const child = children.find(c => c.id == childId)
  const [news, calendar, notifications, menu, schedule] = await Promise.all([
    getNews(childId, cookie), 
    getCalendar(childId, cookie), 
    getNotifications(childId, cookie), 
    getMenu(childId, cookie), 
    getSchedule(childId, cookie)])

  return {child, news, calendar, notifications, menu, schedule}
}


module.exports = {
  login,
  waitForToken,
  getChildren,
  getChildById,
  getNews,
  getCalendar,
  getNotifications,
  getMenu,
  getSchedule,
  download
}