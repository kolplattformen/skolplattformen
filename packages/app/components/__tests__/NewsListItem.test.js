import React from 'react'
import { render } from '../../utils/testHelpers.tsx'
import { NewsListItem } from '../newsListItem.component'
import MockDate from 'mockdate'
import { fireEvent } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'
import { ChildProvider } from '../childContext.component'

jest.mock('@react-navigation/native')
jest.mock('@skolplattformen/api-hooks', () => ({
  useApi: jest.fn().mockReturnValue({ api: { getSessionCookie: jest.fn() } }),
}))

const defaultItem = {
  author: 'Köket',
  intro: 'Nu blir det köttbullar',
  header: 'K-bullar!',
  published: '2021-02-15T09:13:28.484Z',
  modified: '2021-02-15T09:13:28.484Z',
}

const setup = (customProps = {}) => {
  const props = {
    item: defaultItem,
    ...customProps,
  }

  return render(
    <ChildProvider child={{ id: 1 }}>
      <NewsListItem {...props} />
    </ChildProvider>
  )
}

beforeEach(() => {
  MockDate.set('2021-02-15T09:30:28.484Z')
})

test('renders an article', () => {
  const screen = setup()

  expect(screen.getByText(/k-bullar!/i)).toBeTruthy()
  expect(screen.getByText(/nu blir det köttbullar/i)).toBeTruthy()
  expect(screen.getByText('Köket • för 17 minuter sedan')).toBeTruthy()
})

test('renders article without date', () => {
  const itemWithInvalidDate = {
    ...defaultItem,
    published: null,
    modified: null,
  }

  const screen = setup({ item: itemWithInvalidDate })

  expect(screen.getByText(/k-bullar!/i)).toBeTruthy()
  expect(screen.getByText(/nu blir det köttbullar/i)).toBeTruthy()
  expect(screen.getByText(/^köket$/i)).toBeTruthy()
})

test('falls back to modified date if no published date', () => {
  const itemWithInvalidDate = {
    ...defaultItem,
    published: null,
  }

  const screen = setup({ item: itemWithInvalidDate })

  expect(screen.getByText(/k-bullar!/i)).toBeTruthy()
  expect(screen.getByText(/nu blir det köttbullar/i)).toBeTruthy()
  expect(screen.getByText('Köket • för 17 minuter sedan')).toBeTruthy()
})

test('navigates to news article on press', () => {
  const navigate = jest.fn()
  useNavigation.mockReturnValue({ navigate })

  const screen = setup()

  fireEvent.press(screen.getByText(/k-bullar!/i))

  expect(navigate).toHaveBeenCalledWith('NewsItem', {
    child: { id: 1 },
    newsItem: defaultItem,
  })
})
