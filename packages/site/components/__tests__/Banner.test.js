import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Banner from '../Banner'

const setup = (customProps = {}) => {
  const props = {
    ...customProps,
  }

  return render(<Banner {...props} />)
}

test('renders a link to app store', () => {
  global.alert = jest.fn()

  setup()

  expect(
    screen.getByAltText('Ladda ner i App Store').parentNode
  ).toHaveAttribute(
    'href',
    'https://apps.apple.com/se/app/%C3%B6ppna-skolplattformen/id1543853468'
  )
})

test('renders a link to play store', () => {
  global.alert = jest.fn()

  setup()

  fireEvent.click(screen.getByAltText('Ladda ner i Google Play Store'))

  expect(global.alert).toHaveBeenCalledWith(
    'Lugn i stormen. Appen väntar på godkännande. Snart kan du ladda ner den! 😊'
  )
})

test('renders a link to integrity policy', () => {
  setup()

  expect(
    screen.getByRole('link', { name: /integritetspolicy/i })
  ).toHaveAttribute('href', '/integritet')
})

test('renders a link to q&a ', () => {
  setup()

  expect(
    screen.getByRole('link', { name: /Frågor och svar/i })
  ).toHaveAttribute('href', '/qa')
})
