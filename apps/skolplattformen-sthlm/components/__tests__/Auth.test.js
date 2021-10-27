import { useApi } from '@skolplattformen/hooks'
import React from 'react'
import { render } from '../../utils/testHelpers'
import { Auth } from '../auth.component'

const setup = () => {
  useApi.mockReturnValue({
    api: { on: jest.fn(), off: jest.fn() },
    isLoggedIn: false,
  })

  const navigation = {
    navigate: jest.fn(),
  }

  return render(<Auth navigation={navigation} />)
}

test('renders a random fun argument state', () => {
  const screen = setup()

  expect(screen.getByText(/öppna skolplattformen/i)).toBeTruthy()
  expect(screen.getByText(/det [a-zåäö]+ alternativet/i)).toBeTruthy()
})
