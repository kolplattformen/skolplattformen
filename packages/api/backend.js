const nodeFetch = require('node-fetch')
const fetch = require('fetch-cookie/node-fetch')(nodeFetch)
const moment = require('moment')
const camel = require('camelcase-keys')
const h2m = require('h2m')
const urls = require('./lib/urls')

const fetchJson = (url) => {
  return fetch(url)
  .then(res => res.ok ? res : Promise.reject(res.statusText))
  .then(res => res.json())
  .then(json => camel(json, { deep: true }))
  .then(json => json.error ? Promise.reject(json.error) : json.data)
}
const pause = ms => new Promise((resolve) => setTimeout(resolve, ms))

const getCookie = () => fetch(urls.children)
  .then(res => res.headers.get('set-cookie'))

const login = async (socialSecurityNumber) => {
  const url = urls.login(socialSecurityNumber)
  const {token, order} = await fetch(url).then(res => res.ok ? res.json() : Promise.reject(res.statusText))

  console.log('got tokens', {token, order})
  
  let status = ''
  let tries = 0

  while(tries++ < 60 && (status !== 'ERROR' && status !== 'OK')) {
    status = await loginStatus(order)
    console.log('status', status)
    if (status !== 'OK') await pause(1000)
  }

  if (status === 'OK'){
    // update cookies
    await fetch(urls.loginTarget).then(res => res.text()).then(text => console.log('loginTarget', text))
    return true
  } else {
    return false
  }
}

const loginStatus = (order) => fetch(urls.checkStatus(order))
  .then(async res => {
    if (!res.ok) return Promise.reject(res.statusText)
    const status = await res.text()
    return status
  })

  const getChildren = () => fetchJson(urls.children)
  const getNews = childId => fetchJson(urls.news(childId))
    .then(news => news.NewsItems.map(({body,preamble: intro, header, bannerImageUrl: imageUrl, pubDateSE: published, modDateSE: modified}) => 
      ({header, intro, body: h2m(body), modified, published, image: urls.image(imageUrl) })))
    .catch(err => ({err}))

  const getCalendar = childId => fetchJson(urls.calendar(childId)).catch(err => ({err}))
  const getNotifications = childId => fetchJson(urls.notifications(childId)).catch(err => ({err}))
  const getMenu = childId => fetchJson(urls.menu(childId)).catch(err => ({err}))
  const getSchedule = childId => fetchJson(urls.schedule(childId, moment().startOf('day').toISOString(), moment().endOf('day').toISOString()))


  const getAll = async () => {
    const children = await getChildren()
    const data = await Promise.all(children.map(async (child) => {

      const childId = child.id
      const [news, calendar, notifications, menu, schedule] = await Promise.all([
        getNews(childId), 
        getCalendar(childId), 
        getNotifications(childId), 
        getMenu(childId), 
        getSchedule(childId)])

      return {child, news, calendar, notifications, menu, schedule}
    }))
    return data
  }


module.exports = {
  login,
  getChildren,
  getNews,
  getCalendar,
  getNotifications,
  getMenu,
  getSchedule,
  getAll
}