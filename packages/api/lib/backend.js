const moment = require('moment')
const h2m = require('h2m')
const {htmlDecode} = require('js-htmlencode')
const urls = require('./urls')

const { fetchJson, fetchText, fetchRaw } = require('./fetch')

const pause = ms => new Promise((resolve) => setTimeout(resolve, ms))

const download = (url, cookie) => fetchRaw(url, cookie)

const login = async (socialSecurityNumber) => {
  const url = urls.login(socialSecurityNumber)
  const token = await fetchJson(url)
  console.log('login started')
  return token
}

const waitForToken = async ({order}, tries = 60) => {
  if (!tries) return Promise.reject('Timeout')
  const status = await fetchText(urls.checkStatus(order))
  if (status === 'OK') {
    const result = await fetchRaw(urls.loginTarget)
    return result.headers.get('set-cookie')
  } else {
    await pause(1000)
    console.log('retry', tries)
    return await waitForToken({order}, tries--)
  }
}

const getChildren = async (cookie) => {
  const children = await fetchJson(urls.children, cookie)
  return children
    .map(({name, id, sdsId, status, schoolId}) =>
      ({name, id, sdsId, status, schoolId}))
}

const getNews = async(childId, cookie) => {
  const news = await fetchJson(urls.news(childId), cookie)
  return news
    .newsItems
    .map(({
      body,
      preamble: intro,
      header,
      bannerImageUrl: imageUrl,
      pubDateSE: published,
      modDateSE: modified
    }) => ({
      header,
      intro,
      body: htmlDecode(h2m(body)),
      modified,
      published,
      imageUrl: urls.image(imageUrl)
    }))
}

const getCalendar = async (childId, cookie) => {
  const url = urls.calendar(childId)
  const calendar = await fetchJson(url, cookie)
  
  return calendar
    .map(({
      title,
      id,
      description,
      location,
      longEventDateTime: startDate,
      longEndDateTime: endDate,
      allDayEvent: allDay
    }) => ({
      title,
      id,
      description,
      location,
      startDate: moment(startDate, 'YYYY-MM-DD hh:mm').toISOString(),
      endDate: moment(endDate, 'YYYY-MM-DD hh:mm').toISOString(),
      allDay
    }))
}

const getNotifications = async (childId, cookie) => {
  const url = urls.notifications(childId)
  const notifications = await fetchJson(url, cookie)
  
  return notifications
    .map(({
      notificationMessage: {
        messages: {
          message: {
            messageid: id,
            messagetext: message,
            messagetime: dateCreated,
            linkbackurl: url,
            sender,
            category,
            messagetype: {
              type: messageType
            }
          }
        } = {}
      }
    }) => ({
      id,
      sender,
      dateCreated: moment(dateCreated).toISOString(),
      message,
      url,
      category,
      messageType
    }))
}

const getMenu = async (childId, cookie) => {
  const url = urls.menu(childId)
  const menu = await fetchJson(url, cookie)
  return menu
}

const getSchedule = async (childId, cookie) => {
  const from = moment().format('YYYY-MM-DD')
  const to = moment().add(7, 'days').format('YYYY-MM-DD')
  const url = urls.schedule(childId, from, to)
  const schedule = await fetchJson(url, cookie)
  
  return schedule
    .map(({
      title,
      id,
      description,
      location,
      longEventDateTime: startDate,
      longEndDateTime: endDate,
      allDayEvent: allDay,
      mentor
    }) => ({
      title,
      id,
      description,
      location,
      startDate: moment(startDate, 'YYYY-MM-DD hh:mm').toISOString(),
      endDate: moment(endDate, 'YYYY-MM-DD hh:mm').toISOString(),
      allDay,
      mentor
    }))
}

const getClassmates = async (childId, cookie) => {
  const url = urls.classmates(childId)
  const classmates = await fetchJson(url, cookie)
  
  return classmates
    .map(({
      sisId,
      firstname,
      lastname,
      location,
      guardians = [],
      className
    }) => ({
      sisId,
      firstname,
      lastname,
      location,
      guardians: guardians.map(({
        emailhome: email,
        firstname,
        lastname,
        telmobile: mobile,
        address
      }) => ({
        email,
        firstname,
        lastname,
        mobile,
        address
      })),
      className
    }))
}

const getChildById = async (childId, cookie) => {
  const children = await getChildren()
  const child = children.find(c => c.id == childId)
  const [
    news,
    calendar,
    notifications,
    menu,
    schedule
  ] = [
    await getNews(childId, cookie), 
    await getCalendar(childId, cookie), 
    await getNotifications(child.sdsId, cookie), 
    await getMenu(child.id, cookie), 
    await getSchedule(child.id, cookie)
  ]

  return {
    child,
    news,
    calendar,
    notifications,
    menu,
    schedule
  }
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
  getClassmates,
  download
}