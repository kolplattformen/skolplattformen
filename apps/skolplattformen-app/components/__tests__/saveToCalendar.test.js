import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import RNCalendarEvents from 'react-native-calendar-events'
import Toast from 'react-native-simple-toast'
import { render } from '../../utils/testHelpers'
import { SaveToCalendar } from '../saveToCalendar.component'

const defaultEvent = {
  title: 'Utvecklingssamtal',
  startDate: '2021-06-19 13:00',
  endDate: '2021-06-19 14:00',
  location: 'Gubbängsskolan',
}

const defaultProps = {
  event: defaultEvent,
}

const setup = (customProps = {}) => {
  const props = {
    ...defaultProps,
    ...customProps,
  }

  return render(<SaveToCalendar {...props} />)
}

beforeAll(() => {
  // Hide errors from state illegal state transition
  // Probably due to mock
  jest.spyOn(console, 'error').mockImplementation(() => {
    // noop
  })
})

beforeEach(jest.clearAllMocks)

test('renders save to calendar', () => {
  const screen = setup()

  fireEvent.press(screen.getByTestId('actionsButton'))

  expect(screen.getByText(/Spara/i)).toBeTruthy()
})

test('requests calendar permissions', () => {
  const screen = setup()

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByText(/Spara/i))

  expect(RNCalendarEvents.requestPermissions).toHaveBeenCalled()
})

test('can save an event to the calendar', async () => {
  const screen = setup({
    event: {
      ...defaultEvent,
      location: null,
      description: null,
    },
  })

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByText(/Spara/i))
  await RNCalendarEvents.requestPermissions()

  expect(RNCalendarEvents.saveEvent).toHaveBeenCalledWith('Utvecklingssamtal', {
    startDate: '2021-06-19T11:00:00.000Z',
    endDate: '2021-06-19T12:00:00.000Z',
  })
})

test('removes any null values from the event', async () => {
  const screen = setup()

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByText(/Spara/i))
  await RNCalendarEvents.requestPermissions()

  expect(RNCalendarEvents.saveEvent).toHaveBeenCalledWith('Utvecklingssamtal', {
    startDate: '2021-06-19T11:00:00.000Z',
    endDate: '2021-06-19T12:00:00.000Z',
    location: 'Gubbängsskolan',
  })
})

test('calls toast with success', async () => {
  const screen = setup()

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByText(/Spara/i))
  await RNCalendarEvents.requestPermissions()
  await RNCalendarEvents.saveEvent()

  expect(Toast.showWithGravity).toHaveBeenCalledWith(
    '✔️ Sparad till kalender',
    'short',
    'bottom'
  )
})

test('says if something goes wrong', async () => {
  const screen = setup()
  RNCalendarEvents.saveEvent.mockRejectedValueOnce()

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByText(/Spara/i))
  await RNCalendarEvents.requestPermissions()
  await RNCalendarEvents.saveEvent()

  expect(Toast.showWithGravity).toHaveBeenCalledWith(
    'Något gick fel',
    'short',
    'bottom'
  )
})

test('tells user if they havent authorized calendar', async () => {
  const screen = setup()
  RNCalendarEvents.requestPermissions.mockResolvedValueOnce('not auth')

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByText(/Spara/i))
  await RNCalendarEvents.requestPermissions()
  await RNCalendarEvents.saveEvent()

  expect(Toast.showWithGravity).toHaveBeenCalledWith(
    'Du måste godkänna åtkomst till kalendern',
    'short',
    'bottom'
  )
})
