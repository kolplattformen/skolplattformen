import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native'
import React from 'react'
import * as AddCalendarEvent from 'react-native-add-calendar-event'
import { render } from '../../utils/testHelpers'
import { SaveToCalendar } from '../saveToCalendar.component'
import Toast from 'react-native-simple-toast'
import { Linking, Platform } from 'react-native'

jest.mock('react-native-simple-toast', () => ({
  SHORT: 'short',
  BOTTOM: 'bottom',
  showWithGravity: jest.fn(),
}))

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native')

  RN.UIManager.measureInWindow = (_node, callback) => {
    callback(0, 0, 42, 42)
  }

  RN.Linking = {
    openURL: jest.fn(),
  }

  return RN
})

jest.mock('react-native-add-calendar-event', () => ({
  presentEventCreatingDialog: jest.fn().mockResolvedValue({ action: 'SAVED' }),
}))

const defaultEvent = {
  title: 'Utvecklingssamtal',
  startDate: '2021-06-19 13:00',
  endDate: '2021-06-19 14:00',
  location: 'Gubbängsskolan',
  allDay: false,
}

const defaultProps = {
  event: defaultEvent,
  child: { name: 'Olle Testperson' },
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
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

beforeEach(jest.clearAllMocks)

test('renders save to calendar', () => {
  const screen = setup()

  fireEvent.press(screen.getByTestId('actionsButton'))

  expect(screen.getByTestId('saveToCalendar')).toBeTruthy()
})

test('can save an event to the calendar', async () => {
  const screen = setup()

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByTestId('saveToCalendar'))

  expect(AddCalendarEvent.presentEventCreatingDialog).toHaveBeenCalledWith({
    allDay: false,
    endDate: '2021-06-19T12:00:00.000Z',
    startDate: '2021-06-19T11:00:00.000Z',
    title: 'Olle Testperson - Utvecklingssamtal',
    location: defaultEvent.location,
  })

  await waitForElementToBeRemoved(() => screen.getByTestId('saveToCalendar'))
})

test('removes any null values from the event', async () => {
  const screen = setup({
    event: {
      ...defaultEvent,
      location: null,
    },
  })

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByTestId('saveToCalendar'))

  expect(AddCalendarEvent.presentEventCreatingDialog).toHaveBeenCalledWith({
    allDay: false,
    endDate: '2021-06-19T12:00:00.000Z',
    startDate: '2021-06-19T11:00:00.000Z',
    title: 'Olle Testperson - Utvecklingssamtal',
  })

  await waitForElementToBeRemoved(() => screen.getByTestId('saveToCalendar'))
})

test('calls toast with success', async () => {
  const screen = setup()

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByTestId('saveToCalendar'))

  await waitFor(() =>
    expect(Toast.showWithGravity).toHaveBeenCalledWith(
      '✔️ Sparad till kalender',
      'short',
      'bottom'
    )
  )
})

test('says if something goes wrong', async () => {
  const screen = setup()

  AddCalendarEvent.presentEventCreatingDialog.mockImplementationOnce(() => {
    throw new Error('Error from test')
  })

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByTestId('saveToCalendar'))

  await waitFor(() =>
    expect(Toast.showWithGravity).toHaveBeenCalledWith(
      'Något gick fel',
      'short',
      'bottom'
    )
  )
})

test('tells user if they havent authorized calendar', async () => {
  const screen = setup()

  AddCalendarEvent.presentEventCreatingDialog.mockImplementationOnce(() => {
    throw 'permissionNotGranted'
  })

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByTestId('saveToCalendar'))

  expect(Toast.showWithGravity).toHaveBeenCalledWith(
    'Du måste godkänna åtkomst till kalendern',
    'short',
    'bottom'
  )
})

test('can open device calendar to day on IOS', async () => {
  const screen = setup()

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByTestId('openDayInDeviceCalendar'))

  expect(Linking.openURL).toHaveBeenCalledWith('calshow:645793200')
})

test('can open device calendar to day on Android', async () => {
  const screen = setup()

  Platform.OS = 'android'

  fireEvent.press(screen.getByTestId('actionsButton'))
  fireEvent.press(screen.getByTestId('openDayInDeviceCalendar'))

  expect(Linking.openURL).toHaveBeenCalledWith(
    'content://com.android.calendar/time/1624100400000'
  )
})
