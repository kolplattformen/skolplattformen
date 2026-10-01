import { useMenu } from '@skolplattformen/hooks'
import React from 'react'
import { render } from '../../utils/testHelpers'
import { translate } from '../../utils/translation'
import { Menu } from '../menu.component'

jest.mock('@skolplattformen/hooks')

const defaultItemList = [
  {
    title: 'Måndag',
    description: 'Krämiga köttbullar',
  },
  {
    title: 'Tisdag',
    description: 'Kryddig falukorv',
  },
  {
    title: 'Onsdag',
    description: 'Sushi',
  },
]

const setup = (itemList = defaultItemList) => {
  useMenu.mockReturnValue({
    data: itemList,
  })

  return render(<Menu />)
}

test('renders multiple days', () => {
  const screen = setup()

  expect(screen.getByText('Måndag')).toBeTruthy()
  expect(screen.getByText('Tisdag')).toBeTruthy()
  expect(screen.getByText('Onsdag')).toBeTruthy()
})

test('renders title and description', () => {
  const screen = setup()

  expect(screen.getByText('Måndag')).toBeTruthy()
  expect(screen.getByText('Krämiga köttbullar')).toBeTruthy()
})

test('renders empty menu', () => {
  const screen = setup([])
  expect(screen.getByText(translate('menu.emptyText'))).toBeTruthy()
})
