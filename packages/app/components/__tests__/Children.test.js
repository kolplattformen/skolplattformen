import {
  useApi,
  useChildList,
  useCalendar,
  useNews,
  useNotifications,
  useSchedule,
  useMenu,
} from '@skolplattformen/api-hooks'
import { render } from '../../utils/testHelpers'
import React from 'react'
import { Children } from '../children.component'
import { useNavigation } from '@react-navigation/native'
import * as RNLocalize from 'react-native-localize'

jest.mock('@skolplattformen/api-hooks')
jest.mock('@react-navigation/native')
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
  useNavigation.mockReturnValue({ navigate: jest.fn() })
})

test('renders loading state', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [],
    status: 'loading',
  }))

  const screen = setup()

  expect(screen.getByText(/laddar/i)).toBeTruthy()
})

test('renders empty state message', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [],
    status: 'loaded',
  }))

  const screen = setup()

  expect(
    screen.getByText(
      'Det finns inga barn registrerade för ditt personnummer i Stockholms stad'
    )
  ).toBeTruthy()
})

test('renders error state message', () => {
  useChildList.mockImplementationOnce(() => ({
    data: [],
    status: 'error',
  }))

  const screen = setup()

  expect(screen.getByText('Hoppsan!')).toBeTruthy()
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

  expect(screen.getByText('Inga nya inlägg denna vecka.')).toBeTruthy()
})
