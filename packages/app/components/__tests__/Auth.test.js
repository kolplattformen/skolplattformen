import { useApi } from '@skolplattformen/api-hooks'
import { render } from '../../utils/testHelpers.tsx'
import React from 'react'
import { Auth } from '../auth.component'
import { useAsyncStorage } from 'use-async-storage'

jest.mock('@skolplattformen/api-hooks')
jest.mock('use-async-storage')
jest.mock('react-native-localize')

const setup = () => {
  useApi.mockReturnValue({
    api: { on: jest.fn(), off: jest.fn() },
    isLoggedIn: false,
  })

  const navigation = {
    navigate: jest.fn(),
  }

  useAsyncStorage.mockReturnValue(['ssn', jest.fn()])

  return render(<Auth navigation={navigation} />)
}

test('renders a random fun argument state', () => {
  const screen = setup()

  expect(screen.getByText(/öppna skolplattformen/i)).toBeTruthy()
  expect(screen.getByText(/det [a-zåäö]+ alternativet/i)).toBeTruthy()
})
