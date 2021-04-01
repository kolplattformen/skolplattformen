import * as routes from '../routes'

test.each([
  ['children', routes.children],
  ['calender', routes.calendar('123')],
  ['classmates', routes.classmates('123')],
  ['classmates', routes.user],
  ['news', routes.news('123')],
  ['newsDetails', routes.newsDetails('123')],
  ['image', routes.image('123')],
  ['notifications', routes.notifications('123')],
  ['menuRss', routes.menuRss('123')],
  ['menuList', routes.menuList('123')],
  ['menuChoice', routes.menuChoice('123')],
  ['schedule', routes.schedule('123')],
])('handles route %s', (_name, input) => {
  expect(input).toMatchSnapshot()
})
