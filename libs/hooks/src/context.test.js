import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import { ApiProvider } from './provider'
import init from './__mocks__/@skolplattformen/embedded-api'
import { useApi } from './context'

describe('useApi()', () => {
  let api
  beforeEach(() => {
    api = init()
  })
  const wrapper = ({ children }) => (
    <ApiProvider api={api}>{children}</ApiProvider>
  )
  it('exposes api', () => {
    const { result } = renderHook(() => useApi(), { wrapper })

    expect(result.current.api).toBeTruthy()
  })
  it('exposes isLoggedIn', () => {
    const { result } = renderHook(() => useApi(), { wrapper })

    expect(result.current.isLoggedIn).toBe(false)
  })
  it('updates isLoggedIn', async () => {
    const { result, waitForValueToChange } = renderHook(() => useApi(), {
      wrapper,
    })
    await act(async () => {
      api.isLoggedIn = true
      api.emitter.emit('login')
      await waitForValueToChange(() => result.current.isLoggedIn)
    })

    expect(result.current.isLoggedIn).toBe(true)
  })
  it('updates isFake', async () => {
    const { result, waitForValueToChange } = renderHook(() => useApi(), {
      wrapper,
    })
    await act(async () => {
      api.isFake = true
      api.emitter.emit('login')
      await waitForValueToChange(() => result.current.isFake)
    })

    expect(result.current.isFake).toBe(true)
  })
})
