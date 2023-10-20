import { useApi, useNewsDetails } from '../../libs/hooks/src'
import React from 'react'
import { render } from '../../utils/testHelpers'
import { NewsItem } from '../newsItem.component'
import { setImmediate } from 'timers/promises'
import { set } from 'mockdate'

jest.mock('../../libs/hooks/src')

const defaultNewsItem = {
  author: 'Köket',
  fullImageUrl:
    'https://images.unsplash.com/photo-1629652487043-fb2825838f8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80',
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

test('gets article details using useNewsDetails', () => {
  setImmediate(() => {
    setup()

    expect(useNewsDetails).toHaveBeenCalledWith({ id: 1 }, defaultNewsItem)
  })
})

test('renders an article', () => {
  setImmediate(() => {
    const screen = setup()

    expect(screen.getByText(/nu blir det köttbullar/i)).toBeTruthy()
    expect(screen.getByText('Publicerad: 15 feb 2021 10:13')).toBeTruthy()
    expect(screen.getByText('Uppdaterad: 15 feb 2021 10:13')).toBeTruthy()
  })
})

test('renders an article without published date if date is invalid', () => {
  const newsItemWithoutPublishedDate = {
    ...defaultNewsItem,
    published: '2020-08-16T21:10:00.000+02:0',
  }
  setImmediate(() => {
    const screen = setup({ newsItem: newsItemWithoutPublishedDate })

    expect(screen.getByText(/nu blir det köttbullar/i)).toBeTruthy()
    expect(screen.getByText('Uppdaterad: 15 feb 2021 10:13')).toBeTruthy()
    expect(screen.queryByText('Publicerad: Invalid DateTime')).toBeFalsy()
  })
})

test('renders an article without modified date if date is invalid', () => {
  const newsItemWithoutPublishedDate = {
    ...defaultNewsItem,
    modified: null,
  }
  setImmediate(() => {
    const screen = setup({ newsItem: newsItemWithoutPublishedDate })

    expect(screen.getByText(/nu blir det köttbullar/i)).toBeTruthy()
    expect(screen.getByText('Publicerad: 15 feb 2021 10:13')).toBeTruthy()
    expect(screen.queryByText('Uppdaterad: Invalid DateTime')).toBeFalsy()
  })
})
