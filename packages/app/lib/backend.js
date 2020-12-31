import init from '@skolplattformen/embedded-api'
import CookieManager from '@react-native-community/cookies'

// keep a static version of this object so we can keep the session alive
export const api = init(fetch, () => CookieManager.clearAll())

export function * fillChild (child) {
  console.log(`loading notifications for ${child.name}...`)
  yield api.getNotifications(child)
    .catch(err => Promise.resolve([{ err }]))
    .then(notifications => ({ notifications }))

  console.log(`loading news for ${child.name}...`)
  yield api.getNews(child)
    .catch(err => Promise.resolve([{ err }]))
    .then(news => ({ news }))

  console.log(`loading menu for ${child.name}...`)
  yield api.getMenu(child)
    .catch(err => Promise.resolve([{ err }]))
    .then(menu => ({ menu }))

  console.log(`loading calendar for ${child.name}...`)
  yield api.getCalendar(child)
    .catch(err => Promise.resolve([{ err }]))
    .then(calendar => ({ calendar }))

  console.log(`loading schedule for ${child.name}...`)
  yield api.getSchedule(child)
    .catch(err => Promise.resolve([{ err }]))
    .then(schedule => ({ schedule }))

  console.log(`loading classmates for ${child.name}...`)
  yield api.getClassmates(child)
    .catch(err => Promise.resolve([{ err }]))
    .then(classmates => ({ classmates }))
}
