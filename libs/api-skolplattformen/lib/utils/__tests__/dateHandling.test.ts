import { parseDate } from '../dateHandling'

test.each([
  ['2020-12-21 09:00', '2020-12-21T08:00:00.000Z'],
  ['2021-05-28', '2021-05-27T22:00:00.000Z'],
  ['2 oktober 2020', '2020-10-01T22:00:00.000Z'],
  ['12 oktober 2020', '2020-10-11T22:00:00.000Z'],
  ['5 oktober 2020 11:34', '2020-10-05T09:34:00.000Z'],
  ['15 oktober 2020 11:34', '2020-10-15T09:34:00.000Z'],
  ['2020-12-18T15:59:46.34', '2020-12-18T14:59:46.340Z'],
  ['2020-12-18T15:59:46.340Z', '2020-12-18T15:59:46.340Z'],
  ['This is an invalid date', undefined],
])('handles date parsing of %s', (input, expected) => {
  expect(parseDate(input)).toEqual(expected)
})
