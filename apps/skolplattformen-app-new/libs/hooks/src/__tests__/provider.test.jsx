import React from 'react'
import { render } from '@testing-library/react'
import { ApiProvider } from './provider'
import init from './__mocks__/@skolplattformen/embedded-api'
import { useApi } from './context'

describe('ApiProvider', () => {
  const Login = () => {
    const { isLoggedIn } = useApi()
    return (
      <div>
        <div data-testid="isLoggedIn">{isLoggedIn ? 'y' : 'n'}</div>
      </div>
    )
  }
  let api
  beforeEach(() => {
    api = init()
  })
  it('enables useApi()', () => {
    const { getByTestId } = render(
      <ApiProvider api={api}>
        <Login />
      </ApiProvider>
    )

    expect(getByTestId('isLoggedIn').textContent).toEqual('n')
  })
})
