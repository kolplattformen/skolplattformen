import React from 'react'
import { render } from '../../utils/testHelpers'
import Absence from '../absence.component'

const setup = (customProps = {}) => {
  const props = {
    ...customProps,
  }

  return render(<Absence {...props} />)
}

test('renders subtitle with date', () => {
  const screen = setup()

  expect(screen.getByText('Test')).toBeTruthy()
})
