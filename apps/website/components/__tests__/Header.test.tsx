import React from 'react'
import { render, screen } from '../../utils/test-utils'
import Header from '../Header'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '',
  }),
}))

const setup = (customProps = {}) => {
  global.matchMedia = jest.fn().mockReturnValue({ addEventListener: jest.fn() })

  const props = {
    ...customProps,
  }

  return render(<Header {...props} />)
}

test('displays logo linked to start page', () => {
  setup()

  const logo = screen.getByAltText(/skolplattformen-app/i)

  expect(logo).toBeInTheDocument()
  expect(logo.parentNode).toHaveAttribute('href', '/')
})
