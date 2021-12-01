import React from 'react'
import { render, screen } from '../../utils/test-utils'
import DownloadButtons from '../DownloadButtons'

const setup = (customProps = {}) => {
  const props = {
    ...customProps,
  }

  return render(<DownloadButtons {...props} />)
}

test('renders a link to app store', () => {
  setup()

  expect(screen.getByRole('link', { name: /app store/i })).toHaveAttribute(
    'href',
    'https://apps.apple.com/se/app/%C3%B6ppna-skolplattformen-app/id1543853468'
  )
})

test('renders a link to play store', () => {
  setup()

  expect(screen.getByRole('link', { name: /play store/i })).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=org.skolplattformen.app'
  )
})
