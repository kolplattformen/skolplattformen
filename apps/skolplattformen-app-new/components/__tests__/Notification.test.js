import React from 'react'
import { render } from '../../utils/testHelpers'
import { Notification } from '../notification.component'
import MockDate from 'mockdate'

const defaultItem = {
  sender: 'Planering',
  category: 'Bedömning',
  dateCreated: '2021-02-15T09:13:28.484Z',
  dateModified: '2021-02-15T09:14:28.484Z',
}

// copied from https://github.com/react-native-webview/react-native-webview/issues/2934#issuecomment-1524101977
jest.mock('react-native-webview', () => {
  const { View } = require('react-native')
  return {
    WebView: View,
  }
})
//

const setup = (customProps = {}) => {
  const props = {
    item: defaultItem,
    ...customProps,
  }

  return render(<Notification {...props} />)
}

beforeEach(() => {
  MockDate.set('2021-02-15T09:30:28.484Z')
})

test('renders subtitle with modified date', () => {
  const screen = setup()

  expect(screen.getByText('Bedömning • för 16 minuter sedan')).toBeTruthy()
})

test('renders subtitle with created date', () => {
  const itemWithoutModifiedDate = {
    ...defaultItem,
    dateModified: undefined,
  }

  const screen = setup({ item: itemWithoutModifiedDate })

  expect(screen.getByText('Bedömning • för 17 minuter sedan')).toBeTruthy()
})

test('renders subtitle without date', () => {
  const itemWithoutDate = {
    ...defaultItem,
    dateCreated: undefined,
    dateModified: undefined,
  }

  const screen = setup({ item: itemWithoutDate })

  expect(screen.getByText('Bedömning')).toBeTruthy()
})

test('renders subtitle without category', () => {
  const itemWithoutCategory = {
    ...defaultItem,
    category: undefined,
  }

  const screen = setup({ item: itemWithoutCategory })

  expect(screen.getByText('för 16 minuter sedan')).toBeTruthy()
})
