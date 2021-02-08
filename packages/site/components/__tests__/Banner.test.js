import React from 'react'
import { render, screen } from '@testing-library/react'
import Banner from '../Banner'

const setup = (customProps = {}) => {
  const props = {
    ...customProps,
  }

  return render(<Banner {...props} />)
}

test('renders a link to app store', () => {
  setup()

  expect(screen.getByRole('link', { name: /app store/i })).toHaveAttribute(
    'href',
    '#'
  )
})

test('renders a link to play store', () => {
  setup()

  expect(screen.getByRole('link', { name: /play store/i })).toHaveAttribute(
    'href',
    '#'
  )
})

test('renders a link to integrity policy', () => {
  setup()

  expect(
    screen.getByRole('link', { name: /integritetspolicy/i })
  ).toHaveAttribute('href', '/integritet')
})
