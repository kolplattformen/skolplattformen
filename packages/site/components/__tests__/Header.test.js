import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '',
  }),
}))

const setup = (customProps = {}) => {
  const props = {
    ...customProps,
  }

  return render(<Header {...props} />)
}

test('displays logo linked to start page', () => {
  setup()

  const logo = screen.getByAltText(/skolplattformen/i)

  expect(logo).toBeInTheDocument()
  expect(logo.parentNode).toHaveAttribute('href', '/')
})

test('handles click on download button', () => {
  global.alert = jest.fn()

  setup()

  fireEvent.click(screen.getByRole('link', { name: /ladda ner/i }))

  expect(global.alert).toHaveBeenCalledWith(
    'Håll ut! Appen kommer snart på App Store och Google Play'
  )
})
