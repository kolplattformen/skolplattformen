import moment from 'moment'
import init from "@skolplattformen/embedded-api"
export const api = init(fetch)  // keep a static version of this object so we can keep the session alive


export const loadChildrenDetails = async (children, what = {news: true}) => await Promise.all(children.map(async child => ({
  ...child,
  news: !what.news ? child.news : await api.getNews(child),
  calendar: !what.calendar ? child.calendar : await api.getCalendar(child),
  notifications:  !what.notifications ? child.notifications : await api.getNotifications(child),
  schedule: !what.schedule ? child.schedule : await api.getSchedule(child, moment().startOf('day'), moment().add(7,'days').endOf('day')),
  classmates: !what.classmates ? child.classmates : await api.getClassmates(child),
  menu: !what.menu ? child.menu : await api.getMenu(child),
})))

