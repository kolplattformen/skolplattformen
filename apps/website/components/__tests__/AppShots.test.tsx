import React from 'react'
import { render, screen } from '../../utils/test-utils'
import AppShots from '../AppShots'

const setup = (customProps = {}) => {
  const props = {
    ...customProps,
  }

  return render(<AppShots {...props} />)
}

test('renders images', () => {
  setup()

  expect(screen.getByAltText(/^inloggning med bankid$/i)).toBeInTheDocument()
  expect(
    screen.getByAltText(/^lista med dina barn i stockholms stad$/i)
  ).toBeInTheDocument()
  expect(screen.getByAltText(/^barnets nyheter$/i)).toBeInTheDocument()
  expect(screen.getByAltText(/^barnets aviseringar$/i)).toBeInTheDocument()
  expect(screen.getByAltText(/^barnets kalender/i)).toBeInTheDocument()
  expect(screen.getByAltText(/^barnets klasskompisar$/i)).toBeInTheDocument()
  expect(screen.getByAltText(/^frånvaroanmälan$/i)).toBeInTheDocument()
})
