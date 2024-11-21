import * as routes from '../routes'

Date.now = jest.fn(() => 1618404258782)

test.each([
  ['children', routes.children],
  ['calender', routes.calendar('123')],
  ['classmates', routes.classmates('123')],
  ['user', routes.user],
  ['news', routes.news('123')],
  ['newsDetails', routes.newsDetails('123', '321')],
  ['image', routes.image('https://example.com/img.png')],
  ['notifications', routes.notifications('123')],
  ['menuRss', routes.menuRss('123')],
  ['menuList', routes.menuList('123')],
  ['menuChoice', routes.menuChoice('123')],
  ['schedule', routes.schedule('123', '2021-01-01', '2021-01-01')],
  ['login with personal number', routes.login('201701012393')],
  ['login without personal number', routes.login()],
])('handles route %s', (_name, input) => {
  expect(input).toMatchSnapshot()
})
