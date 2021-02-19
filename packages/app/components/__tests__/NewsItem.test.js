import React from 'react'
import { render } from '../../utils/testHelpers'
import { NewsItem } from '../newsItem.component'
import MockDate from 'mockdate'
import { fireEvent } from '@testing-library/react-native'
import { useNewsDetails, useApi } from '@skolplattformen/api-hooks'

jest.mock('@skolplattformen/api-hooks')

const defaultNewsItem = {
  author: 'Köket',
  fullImageUrl: 'test.png',
  header: 'K-bullar!',
  published: '2021-02-15T09:13:28.484Z',
  modified: '2021-02-15T09:13:28.484Z',
}

let navigation

const setup = (customProps = { newsItem: {} }) => {
  useApi.mockReturnValue({ api: { getSessionCookie: jest.fn() } })
  useNewsDetails.mockReturnValue({
    data: {
      body: 'Nu blir det köttbullar',
    },
  })

  navigation = {
    goBack: jest.fn(),
  }

  const newsItem = {
    ...defaultNewsItem,
    ...customProps.newsItem,
  }

  const props = {
    navigation,
    route: {
      params: {
        child: { id: 1 },
        newsItem,
      },
    },
    ...customProps,
  }

  return render(<NewsItem {...props} />)
}

beforeEach(() => {
  MockDate.set('2021-02-15T09:30:28.484Z')
})

test('gets article details using useNewsDetails', () => {
  setup()

  expect(useNewsDetails).toHaveBeenCalledWith({ id: 1 }, defaultNewsItem)
})

test('renders an article', () => {
  const screen = setup()

  screen.debug()

  expect(screen.getByText(/k-bullar!/i)).toBeTruthy()
  expect(screen.getByText(/nu blir det köttbullar/i)).toBeTruthy()
  expect(screen.getByText('Publicerad: 15 feb. 2021 10:13')).toBeTruthy()
  expect(screen.getByText('Uppdaterad: 15 feb. 2021 10:13')).toBeTruthy()
})

test('renders an article without published date if date is invalid', () => {
  const newsItemWithoutPublishedDate = {
    ...defaultNewsItem,
    published: '__invalid_date__',
  }

  const screen = setup({ newsItem: newsItemWithoutPublishedDate })

  expect(screen.getByText(/k-bullar!/i)).toBeTruthy()
  expect(screen.getByText(/nu blir det köttbullar/i)).toBeTruthy()
  expect(screen.getByText('Uppdaterad: 15 feb. 2021 10:13')).toBeTruthy()
  expect(screen.queryByText('Publicerad: Invalid DateTime')).toBeFalsy()
})

test('renders an article without modified date if date is invalid', () => {
  const newsItemWithoutPublishedDate = {
    ...defaultNewsItem,
    modified: '__invalid_date__',
  }

  const screen = setup({ newsItem: newsItemWithoutPublishedDate })

  expect(screen.getByText(/k-bullar!/i)).toBeTruthy()
  expect(screen.getByText(/nu blir det köttbullar/i)).toBeTruthy()
  expect(screen.getByText('Publicerad: 15 feb. 2021 10:13')).toBeTruthy()
  expect(screen.queryByText('Uppdaterad: Invalid DateTime')).toBeFalsy()
})

test('handles navigating back to child view', () => {
  const screen = setup()

  fireEvent.press(screen.getByA11yLabel('Tillbaka till barn'))

  expect(navigation.goBack).toHaveBeenCalled()
})
