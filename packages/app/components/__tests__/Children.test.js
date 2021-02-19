import {
  useChildList,
  useCalendar,
  useClassmates,
  useNews,
  useNotifications,
  useSchedule,
} from '@skolplattformen/api-hooks'
import { render } from '../../utils/testHelpers'
import React from 'react'
import { Children } from '../children.component.js'

jest.mock('@skolplattformen/api-hooks')

const setup = () => {
  return render(<Children />)
}

beforeEach(() => {
  useCalendar.mockReturnValueOnce({ data: [], status: 'loaded' })
  useNotifications.mockReturnValueOnce({ data: [], status: 'loaded' })
  useNews.mockReturnValueOnce({ data: [], status: 'loaded' })
  useClassmates.mockReturnValueOnce({ data: [], status: 'loaded' })
  useSchedule.mockReturnValueOnce({ data: [], status: 'loaded' })
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
      'Det finns inga barn registrerade för ditt personnummer i Stockholms Stad'
    )
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
  expect(screen.getByText('Förskoleklass')).toBeTruthy()
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
  expect(screen.getByText('Grundskolan')).toBeTruthy()
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
  expect(screen.getByText('Gymnasiet')).toBeTruthy()
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
  expect(screen.getByText('Gymnasiet')).toBeTruthy()

  expect(screen.getByText('Lillebror Testsson')).toBeTruthy()
  expect(screen.getByText('Grundskolan')).toBeTruthy()
})

test('displays class name if child has class mates', () => {
  useClassmates.mockReset()
  useClassmates.mockReturnValueOnce({
    data: [
      {
        className: '8C',
      },
    ],
    status: 'loaded',
  })
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
  expect(screen.getByText('8C')).toBeTruthy()
  expect(screen.queryByText('Gymnasiet')).toBeFalsy()
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

  expect(screen.getByText('Test Testsson')).toBeTruthy()
  expect(screen.getByText('Gymnasiet, Grundskolan, Förskoleklass')).toBeTruthy()
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
