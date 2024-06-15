import { useMenu } from '../../libs/hooks/src'
import React from 'react'
import { render } from '../../utils/testHelpers'
import { translate } from '../../utils/translation'
import { Menu } from '../menu.component'

jest.mock('../../libs/hooks/src')

const defaultItemList = [
  {
    title: 'Måndag vecka 10',
    description: 'Krämiga köttbullar',
  },
  {
    title: 'Tisdag vecka 10',
    description: 'Kryddig falukorv',
  },
  {
    title: 'Onsdag vecka 10',
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

  expect(screen.getByText('Måndag vecka 10')).toBeTruthy()
  expect(screen.getByText('Tisdag vecka 10')).toBeTruthy()
  expect(screen.getByText('Onsdag vecka 10')).toBeTruthy()
})

test('renders title and description', () => {
  const screen = setup()

  expect(screen.getByText('Måndag vecka 10')).toBeTruthy()
  expect(screen.getByText('Krämiga köttbullar')).toBeTruthy()
})

test('renders empty menu', () => {
  const screen = setup([])
  expect(screen.getByText(translate('menu.emptyText'))).toBeTruthy()
})
