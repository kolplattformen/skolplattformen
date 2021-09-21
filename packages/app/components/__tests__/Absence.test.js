import { useRoute } from '@react-navigation/native'
import { fireEvent, waitFor } from '@testing-library/react-native'
import Mockdate from 'mockdate'
import React from 'react'
import { useSMS } from '../../utils/SMS'
import { render } from '../../utils/testHelpers'
import Absence from '../absence.component'
import { useUser } from '@skolplattformen/api-hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'

jest.mock('@react-navigation/native')
jest.mock('@skolplattformen/api-hooks')
jest.mock('../../utils/SMS')

let sendSMS
let user = { personalNumber: '201701092395' }

// needed to skip tests due to bug in RN 0.65.1
// https://github.com/facebook/react-native/issues/29849#issuecomment-734533635

const setup = (customProps = {}) => {
  sendSMS = jest.fn()

  useSMS.mockReturnValue({ sendSMS })
  useRoute.mockReturnValue({ params: { child: { id: '1' } } })

  const props = {
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
  jest.useFakeTimers()
  jest.clearAllMocks()
  useUser.mockReturnValue({
    data: user,
    status: 'loaded',
  })
  AsyncStorage.clear()
})

test.skip('can fill out the form with full day absence', async () => {
  const screen = setup()

  await waitFor(() =>
    fireEvent.changeText(
      screen.getByTestId('personalIdentityNumberInput'),
      '1212121212'
    )
  )
  await waitFor(() => fireEvent.press(screen.getByText('Skicka')))

  expect(screen.queryByText(/starttid/i)).toBeFalsy()
  expect(screen.queryByText(/sluttid/i)).toBeFalsy()

  expect(sendSMS).toHaveBeenCalledWith('121212-1212')
})

test('handles missing personal identity number', async () => {
  const screen = setup()

  await waitFor(() => fireEvent.press(screen.getByText('Skicka')))

  expect(screen.getByText(/Personnummer saknas/i)).toBeTruthy()
  expect(sendSMS).not.toHaveBeenCalled()
})

test('validates personal identity number', async () => {
  const screen = setup()

  await waitFor(() =>
    fireEvent.changeText(
      screen.getByTestId('personalIdentityNumberInput'),
      '12121212'
    )
  )
  await waitFor(() => fireEvent.press(screen.getByText('Skicka')))

  expect(screen.getByText(/Personnumret är ogiltigt/i)).toBeTruthy()
  expect(sendSMS).not.toHaveBeenCalled()
})

test.skip('can fill out the form with part of day absence', async () => {
  Mockdate.set('2021-02-18 15:30')

  const screen = setup()

  await waitFor(() =>
    fireEvent.changeText(
      screen.getByTestId('personalIdentityNumberInput'),
      '1212121212'
    )
  )
  await waitFor(() => fireEvent.press(screen.getByText('Heldag')))

  expect(screen.getByText(/starttid/i)).toBeTruthy()
  expect(screen.getByText(/sluttid/i)).toBeTruthy()

  await waitFor(() => fireEvent.press(screen.getByText('Skicka')))

  expect(sendSMS).toHaveBeenCalledWith('121212-1212 1500-1700')
})
