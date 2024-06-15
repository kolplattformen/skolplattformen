import { useClassmates } from '../../libs/hooks/src'
import React from 'react'
import { render } from '../../utils/testHelpers'
import { ChildProvider } from '../childContext.component'
import { Classmates } from '../classmates.component'

jest.mock('../../libs/hooks/src')

const defaultClassmates = [
  {
    className: '2B',
    firstname: 'Tyrell',
    lastname: 'Eriksson',
    guardians: [
      {
        firstname: 'Margaery',
        lastname: 'Eriksson',
      },
      {
        firstname: 'Loras',
        lastname: 'Eriksson',
      },
    ],
  },
  {
    className: '2B',
    firstname: 'Adam',
    lastname: 'Svensson',
    guardians: [
      {
        firstname: 'Eva',
        lastname: 'Svensson',
      },
    ],
  },
]

const setup = ({ classmates } = { classmates: defaultClassmates }) => {
  useClassmates.mockReturnValue({
    data: classmates,
  })

  return render(
    <ChildProvider child={{ id: 1 }}>
      <Classmates />
    </ChildProvider>
  )
}

test('gets the classmates for a child from context', () => {
  setup()

  expect(useClassmates).toHaveBeenCalledWith({ id: 1 })
})

test('renders class name', () => {
  const screen = setup()

  expect(screen.getByText(/^klass 2b$/i)).toBeTruthy()
})

test('renders class without name', () => {
  const screen = setup({
    classmates: [],
  })

  expect(screen.getByText(/^klass$/i)).toBeTruthy()
})

test('renders classmates sorted by first name', () => {
  const screen = setup()

  expect(screen.getByLabelText('Barn 1')).toContainElement(
    screen.getByText(/adam svensson/i)
  )
  expect(screen.getByLabelText('Barn 2')).toContainElement(
    screen.getByText(/tyrell eriksson/i)
  )
})

test('renders guardians sorted by first name', () => {
  const screen = setup()

  expect(screen.getByText(/eva svensson/i)).toBeTruthy()
  expect(screen.getByText(/^loras eriksson, margaery eriksson$/i)).toBeTruthy()
})
