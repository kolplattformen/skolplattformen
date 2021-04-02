import React from 'react'
import { render } from '../../utils/testHelpers'
import { Menu } from '../menu.component'
import { useMenu } from '@skolplattformen/api-hooks'

jest.mock('@skolplattformen/api-hooks')

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
  expect(screen.getByText('Det ser lite tomt ut i menyn')).toBeTruthy()
})
