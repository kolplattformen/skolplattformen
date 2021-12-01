import React from 'react'
import { render, screen } from '../../utils/test-utils'
import Banner from '../Banner'

const setup = (customProps = {}) => {
  const props = {
    ...customProps,
  }

  return render(<Banner {...props} />)
}

test('renders a link to app store', () => {
  setup()

  expect(
    screen.getByAltText('Ladda ner i App Store').parentNode
  ).toHaveAttribute(
    'href',
    'https://apps.apple.com/se/app/%C3%B6ppna-skolplattformen-app/id1543853468'
  )
})

test('renders a link to play store', () => {
  setup()

  expect(
    screen.getByAltText('Ladda ner i Google Play Store').parentNode
  ).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=org.skolplattformen.app'
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
