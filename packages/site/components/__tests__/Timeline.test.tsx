import React from 'react'
import { render, screen } from '@testing-library/react'
import Timeline from '../Timeline'
import { events } from '../../data/timelineEvents'

const setup = (customProps = {}) => {
  const props = {
    events,
    ...customProps,
  }

  return render(<Timeline {...props} />)
}

test('pages renders correctly and displays important dates and media', () => {
  setup()

  expect(screen.getAllByText(/januari 2021/i)[0]).toBeInTheDocument()
  expect(screen.getByText(/månaden då appen utvecklas/i)).toBeInTheDocument()
  expect(
    screen.getByText(
      /stockholm stad tar bort kontaktuppgifter till andra föräldrar/i
    )
  ).toBeInTheDocument()
  expect(screen.getByText(/93. agil skolplattform/i)).toBeInTheDocument()
})

test('handles missing Intl', () => {
  const intl = global.Intl
  global.Intl = (undefined as unknown) as typeof Intl

  setup()

  expect(screen.getAllByText(/2021-01/i)[0]).toBeInTheDocument()

  global.Intl = intl
})
