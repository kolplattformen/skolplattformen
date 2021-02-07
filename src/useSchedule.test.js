import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { ApiProvider } from './provider'
import { useSchedule } from './hooks'
import store from './store'
import init from './__mocks__/@skolplattformen/embedded-api'
import createStorage from './__mocks__/AsyncStorage'

const pause = (ms = 0) => new Promise((r) => setTimeout(r, ms))

describe('useSchedule(child, from, to)', () => {
  let api
  let storage
  let response
  let child
  let from
  let to
  const wrapper = ({ children }) => (
    <ApiProvider api={api} storage={storage}>{children}</ApiProvider>
  )
  beforeEach(() => {
    response = [{ id: 1 }]
    api = init()
    api.getSchedule.mockImplementation(() => (
      new Promise((res) => {
        setTimeout(() => res(response), 50)
      })
    ))
    storage = createStorage({
      'schedule_10_2021-01-01_2021-01-08': [{ id: 2 }],
    }, 2)
    child = { id: 10 }
    from = '2021-01-01'
    to = '2021-01-08'
  })
  afterEach(async () => {
    await act(async () => {
      await pause(70)
      store.dispatch({ entity: 'ALL', type: 'CLEAR' })
    })
  })
  it('returns correct initial value', () => {
    const { result } = renderHook(() => useSchedule(child, from, to), { wrapper })

    expect(result.current.status).toEqual('pending')
  })
  it('calls api', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const { waitForNextUpdate } = renderHook(() => useSchedule(child, from, to), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(api.getSchedule).toHaveBeenCalled()
    })
  })
  it('only calls api once', async () => {
    await act(async () => {
      api.isLoggedIn = true
      renderHook(() => useSchedule(child, from, to), { wrapper })
      const { waitForNextUpdate } = renderHook(() => useSchedule(child, from, to), { wrapper })

      await waitForNextUpdate()
      renderHook(() => useSchedule(child, from, to), { wrapper })
      await waitForNextUpdate()
      renderHook(() => useSchedule(child, from, to), { wrapper })
      await waitForNextUpdate()

      const { result } = renderHook(() => useSchedule(child, from, to), { wrapper })

      expect(api.getSchedule).toHaveBeenCalledTimes(1)
      expect(result.current.status).toEqual('loaded')
    })
  })
  it('calls cache', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const { result, waitForNextUpdate } = renderHook(() => useSchedule(child, from, to), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.data).toEqual([{ id: 2 }])
    })
  })
  it('updates status to loading', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const { result, waitForNextUpdate } = renderHook(() => useSchedule(child, from, to), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.status).toEqual('loading')
    })
  })
  it('updates status to loaded', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const { result, waitForNextUpdate } = renderHook(() => useSchedule(child, from, to), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.status).toEqual('loaded')
    })
  })
  it('stores in cache if not fake', async () => {
    await act(async () => {
      api.isLoggedIn = true
      api.isFake = false

      const { waitForNextUpdate } = renderHook(() => useSchedule(child, from, to), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()
      await pause(20)

      expect(storage.cache['schedule_10_2021-01-01_2021-01-08']).toEqual('[{"id":1}]')
    })
  })
  it('does not store in cache if fake', async () => {
    await act(async () => {
      api.isLoggedIn = true
      api.isFake = true

      const { waitForNextUpdate } = renderHook(() => useSchedule(child, from, to), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await pause(20)

      expect(storage.cache['schedule_10_2021-01-01_2021-01-08']).toEqual('[{"id":2}]')
    })
  })
})
