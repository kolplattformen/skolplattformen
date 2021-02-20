import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { Linking } from 'react-native'
import { render } from '../../utils/testHelpers'
import { ContactMenu } from '../contactMenu.component'

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

const defaultGuardian = {
  address: 'Testgatan',
  email: 'adam@adamsson.se',
  firstname: 'Adam',
  lastname: 'Adamsson',
  mobile: '0701234567',
}

const defaultProps = {
  contact: {
    guardians: [defaultGuardian],
  },
}

const setup = (customProps = {}) => {
  const props = {
    ...defaultProps,
    ...customProps,
  }

  return render(<ContactMenu {...props} />)
}

beforeAll(() => {
  // Hide errors from state illegal state transition
  // Probably due to mock
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

beforeEach(jest.clearAllMocks)

test('renders a parent', () => {
  const screen = setup()

  fireEvent.press(screen.getByA11yLabel('Visa kontaktinformation'))

  expect(screen.getByText(/adam adamsson/i)).toBeTruthy()
})

test('displays option to call and text guardian', () => {
  const screen = setup()

  fireEvent.press(screen.getByA11yLabel('Visa kontaktinformation'))

  fireEvent.press(screen.getByText(/ring/i))
  expect(Linking.openURL).toHaveBeenCalledWith('tel:0701234567')

  fireEvent.press(screen.getByText(/sms/i))
  expect(Linking.openURL).toHaveBeenCalledWith('sms:0701234567')
})

test('hides options to call and text if no phone number', () => {
  const guardianWithoutPhoneNumber = {
    contact: {
      guardians: [
        {
          ...defaultGuardian,
          mobile: null,
        },
      ],
    },
  }

  const screen = setup(guardianWithoutPhoneNumber)

  fireEvent.press(screen.getByA11yLabel('Visa kontaktinformation'))

  expect(screen.getByA11yLabel(/ring/i)).toHaveStyle({ display: 'none' })
  expect(screen.getByA11yLabel(/sms/i)).toHaveStyle({ display: 'none' })
})

test('displays option to email guardian', () => {
  const screen = setup()

  fireEvent.press(screen.getByA11yLabel('Visa kontaktinformation'))

  fireEvent.press(screen.getByText(/maila/i))
  expect(Linking.openURL).toHaveBeenCalledWith('mailto:adam@adamsson.se')
})

test('hides options to email phone number', () => {
  const guardianWithoutEmail = {
    contact: {
      guardians: [
        {
          ...defaultGuardian,
          email: null,
        },
      ],
    },
  }

  const screen = setup(guardianWithoutEmail)

  fireEvent.press(screen.getByA11yLabel('Visa kontaktinformation'))

  expect(screen.getByA11yLabel(/maila/i)).toHaveStyle({ display: 'none' })
})

test('displays address of guardian', () => {
  const screen = setup()

  fireEvent.press(screen.getByA11yLabel('Visa kontaktinformation'))

  fireEvent.press(screen.getByText(/hem/i))
  expect(Linking.openURL).toHaveBeenCalledWith(
    'http://maps.apple.com/?daddr=Testgatan'
  )
})

test('hides address if it does not exist', () => {
  const guardianWithoutAddress = {
    contact: {
      guardians: [
        {
          ...defaultGuardian,
          address: null,
        },
      ],
    },
  }

  const screen = setup(guardianWithoutAddress)

  fireEvent.press(screen.getByA11yLabel('Visa kontaktinformation'))

  expect(screen.getByA11yLabel(/hem/i)).toHaveStyle({ display: 'none' })
})
