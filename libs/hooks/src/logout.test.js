import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { ApiProvider } from './provider'
import { useEtjanstChildren } from './hooks'
import store from './store'
import init from './__mocks__/@skolplattformen/embedded-api'
import createStorage from './__mocks__/AsyncStorage'
import reporter from './__mocks__/reporter'

const pause = (ms = 0) => new Promise((r) => setTimeout(r, ms))

describe('logout - cleanup', () => {
  let api
  let storage
  let response
  const wrapper = ({ children }) => (
    <ApiProvider api={api} storage={storage} reporter={reporter}>
      {children}
    </ApiProvider>
  )
  beforeEach(() => {
    response = [{ id: 1 }]
    api = init()
    api.getPersonalNumber.mockReturnValue('123')
    api.getChildren.mockImplementation(
      () =>
        new Promise((res) => {
          setTimeout(() => res(response), 50)
        })
    )
    storage = createStorage(
      {
        '123_etjanst_children': [{ id: 2 }],
      },
      2
    )
  })
  afterEach(async () => {
    await act(async () => {
      await pause(70)
      store.dispatch({ entity: 'ALL', type: 'CLEAR' })
    })
  })
  it('cleans up on logout', async () => {
    await act(async () => {
      api.isLoggedIn = true
      api.isFake = false

      const { waitForNextUpdate: wait1 } = renderHook(
        () => useEtjanstChildren(),
        { wrapper }
      )

      await wait1()
      await wait1()
      await wait1()
      await pause(20)

      api.isLoggedIn = false
      api.emitter.emit('logout')

      const { result } = renderHook(() => useEtjanstChildren(), { wrapper })

      expect(result.current.data).toHaveLength(0)

      api.isLoggedIn = true
      api.emitter.emit('login')

      const { result: result2, waitForNextUpdate: wait2 } = renderHook(
        () => useEtjanstChildren(),
        { wrapper }
      )

      await wait2()

      expect(result2.current.data).toHaveLength(1)
    })
  })
})
