import {
  useApi,
  useChildList,
  useCalendar,
  useNews,
  useNotifications,
  useSchedule,
  useMenu,
  useTimetable,
  useClassmates,
} from '@skolplattformen/api-hooks'
import { render } from '../../utils/testHelpers'
import React from 'react'
import { Children } from '../children.component'
import { useNavigation } from '@react-navigation/core'
import * as RNLocalize from 'react-native-localize'
import { translate } from '../../utils/translation'

jest.mock('@skolplattformen/api-hooks')
jest.mock('@react-navigation/core')
jest.mock('react-native-localize')
const setup = () => {
  return render(<Children />)
}

beforeEach(() => {
  useApi.mockReturnValue({
    api: { on: jest.fn(), off: jest.fn(), logout: jest.fn() },
    isLoggedIn: false,
  })
  RNLocalize.findBestAvailableLanguage.mockImplementationOnce(() => ({
    languageTag: 'sv',
    isRTL: false,
  }))
  useCalendar.mockReturnValueOnce({ data: [], status: 'loaded' })
  useNotifications.mockReturnValueOnce({ data: [], status: 'loaded' })
  useNews.mockReturnValueOnce({ data: [], status: 'loaded' })
  useSchedule.mockReturnValueOnce({ data: [], status: 'loaded' })
  useMenu.mockReturnValueOnce({ data: [], status: 'loaded' })
  useTimetable.mockReturnValueOnce({ data: [], status: 'loaded' })
  useClassmates.mockReturnValueOnce({ data: [], status: 'loaded' })
  useNavigation.mockReturnValue({ navigate: jest.fn(), setOptions: jest.fn() })
})

test('renders loading state', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [],
    status: 'loading',
  }))

  const screen = setup()

  expect(screen.getByText(translate('general.loading'))).toBeTruthy()
})

test('renders empty state message', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [],
    status: 'loaded',
  }))

  const screen = setup()

  expect(
    screen.getByText(translate('children.noKids_description'))
  ).toBeTruthy()
})

test('renders error state message', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [],
    status: 'error',
  }))

  const screen = setup()

  expect(
    screen.getByText(translate('children.loadingErrorHeading'))
  ).toBeTruthy()
})

test('renders child in preschool', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [
      {
        name: 'Test Testsson',
        status: 'F',
      },
    ],
    status: 'loaded',
  }))

  const screen = setup()

  expect(screen.getByText('Test Testsson')).toBeTruthy()
})

test('renders child in elementary school', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [
      {
        name: 'Test Testsson',
        status: 'GR',
      },
    ],
    status: 'loaded',
  }))

  const screen = setup()

  expect(screen.getByText('Test Testsson')).toBeTruthy()
})

test('renders child in high school', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [
      {
        name: 'Test Testsson',
        status: 'G',
      },
    ],
    status: 'loaded',
  }))

  const screen = setup()

  expect(screen.getByText('Test Testsson')).toBeTruthy()
  expect(
    screen.getByText(translate('abbrevations.upperSecondarySchool'))
  ).toBeTruthy()
})

test('renders multiple children', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [
      {
        name: 'Storasyster Testsson',
        status: 'G',
      },
      {
        name: 'Lillebror Testsson',
        status: 'GR',
      },
    ],
    status: 'loaded',
  }))

  const screen = setup()

  expect(screen.getByText('Storasyster Testsson')).toBeTruthy()
  expect(
    screen.getByText(translate('abbrevations.upperSecondarySchool'))
  ).toBeTruthy()

  expect(screen.getByText('Lillebror Testsson')).toBeTruthy()
  expect(
    screen.getByText(translate('abbrevations.compulsorySchool'))
  ).toBeTruthy()
})

test('renders child in class', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [
      {
        name: 'Test Testsson',
        status: 'G',
        schoolID: 'Vallaskolan',
      },
    ],
    status: 'loaded',
  }))
  useClassmates.mockReset()
  useClassmates.mockImplementationOnce(() => ({
    data: [
      {
        className: '8C',
      },
    ],
    status: 'loaded',
  }))

  const screen = setup()

  expect(screen.getByText('Test Testsson')).toBeTruthy()
  expect(screen.getByText('8C • Vallaskolan')).toBeTruthy()
})

test('removes any parenthesis from name', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [
      {
        name: 'Test Testsson (elev)',
        status: 'G',
      },
    ],
    status: 'loaded',
  }))

  const screen = setup()

  expect(screen.getByText('Test Testsson')).toBeTruthy()
})

test('handles multiple statuses for a child', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [
      {
        name: 'Test Testsson(elev)',
        status: 'G;GR;F',
      },
    ],
    status: 'loaded',
  }))

  const screen = setup()

  var multipleStatusesRendered = `${translate(
    'abbrevations.upperSecondarySchool'
  )}, ${translate('abbrevations.compulsorySchool')}, ${translate(
    'abbrevations.leisureTimeCentre'
  )}`

  expect(screen.getByText('Test Testsson')).toBeTruthy()
  expect(screen.getByText(multipleStatusesRendered)).toBeTruthy()
})

test('says if there is nothing new this week', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [
      {
        name: 'Kanye West',
        status: 'F',
      },
    ],
    status: 'loaded',
  }))
  const screen = setup()

  expect(
    screen.getByText(translate('news.noNewNewsItemsThisWeek'))
  ).toBeTruthy()
})
