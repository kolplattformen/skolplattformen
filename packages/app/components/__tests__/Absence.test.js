import { fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import { render } from '../../utils/testHelpers'
import Absence from '../absence.component'
import SMS from '../../utils/SMS'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Mockdate from 'mockdate'

jest.mock('@react-native-async-storage/async-storage')
jest.mock('../../utils/SMS')

const setup = (customProps = {}) => {
  const props = {
    route: { params: { child: { id: '1' } } },
    ...customProps,
  }

  return render(<Absence {...props} />)
}

beforeAll(() => {
  // Hide errors from act
  // https://github.com/callstack/react-native-testing-library/issues/379
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

beforeEach(() => {
  jest.clearAllMocks()
  AsyncStorage.clear()
})

test('renders title', () => {
  const screen = setup()

  expect(screen.getByText('Anmäl frånvaro')).toBeTruthy()
})

test('can fill out the form with full day absence', async () => {
  const screen = setup()

  await waitFor(() =>
    fireEvent.changeText(screen.getByA11yLabel('Personnummer'), '1212121212')
  )
  await waitFor(() => fireEvent.press(screen.getByText('Skicka')))

  expect(screen.queryByText(/starttid/i)).toBeFalsy()
  expect(screen.queryByText(/sluttid/i)).toBeFalsy()

  expect(SMS.send).toHaveBeenCalledWith('121212-1212')
  expect(AsyncStorage.setItem).toHaveBeenCalledWith('@childssn.1', '1212121212')
})

test('handles missing social security number', async () => {
  const screen = setup()

  await waitFor(() => fireEvent.press(screen.getByText('Skicka')))

  expect(screen.getByText(/Personnummer saknas/i)).toBeTruthy()
  expect(SMS.send).not.toHaveBeenCalled()
})

test('validates social security number', async () => {
  const screen = setup()

  await waitFor(() =>
    fireEvent.changeText(screen.getByA11yLabel('Personnummer'), '12121212')
  )
  await waitFor(() => fireEvent.press(screen.getByText('Skicka')))

  expect(screen.getByText(/Personnumret är ogiltigt/i)).toBeTruthy()
  expect(SMS.send).not.toHaveBeenCalled()
})

test('can fill out the form with part of day absence', async () => {
  Mockdate.set('2021-02-18 15:30')

  const screen = setup()

  await waitFor(() =>
    fireEvent.changeText(screen.getByA11yLabel('Personnummer'), '1212121212')
  )
  await waitFor(() => fireEvent.press(screen.getByText('Heldag')))

  expect(screen.getByText(/starttid/i)).toBeTruthy()
  expect(screen.getByText(/sluttid/i)).toBeTruthy()

  await waitFor(() => fireEvent.press(screen.getByText('Skicka')))

  expect(SMS.send).toHaveBeenCalledWith('121212-1212 1500-1700')
})
