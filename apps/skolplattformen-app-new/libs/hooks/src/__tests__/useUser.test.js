import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { ApiProvider } from '../provider'
import { useUser } from '../hooks'
import store from '../store'
import init from '../__mocks__/@skolplattformen/embedded-api'
import createStorage from '../__mocks__/AsyncStorage'
import reporter from '../__mocks__/reporter'

const pause = (ms = 0) => new Promise((r) => setTimeout(r, ms))

describe('useUser()', () => {
  let api
  let storage
  let response
  const wrapper = ({ children }) => (
    <ApiProvider api={api} storage={storage} reporter={reporter}>
      {children}
    </ApiProvider>
  )
  beforeEach(() => {
    response = { id: 1 }
    api = init()
    api.getPersonalNumber.mockReturnValue('123')
    api.getUser.mockImplementation(
      () =>
        new Promise((res) => {
          setTimeout(() => res(response), 50)
        })
    )
    storage = createStorage(
      {
        '123_user': { id: 2 },
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
  it('returns correct initial value', () => {
    const { result } = renderHook(() => useUser(), { wrapper })

    expect(result.current.status).toEqual('pending')
  })
  it('calls api', async () => {
    api.isLoggedIn = true

    await waitFor(() => {
      renderHook(() => useUser(), { wrapper })
    })
    expect(api.getUser).toHaveBeenCalled()
  })
  it('only calls api once', async () => {
    api.isLoggedIn = true
    renderHook(() => useUser(), { wrapper })

    renderHook(() => useUser(), { wrapper })
    renderHook(() => useUser(), { wrapper })

    const { result } = renderHook(() => useUser(), { wrapper })
    await waitFor(() => {
      expect(api.getUser).toHaveBeenCalledTimes(1)
      expect(result.current.status).toEqual('loaded')
    })
  })
  it('calls cache', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useUser(), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.data).toEqual({ id: 2 })
    })
  })
  it('updates status to loading', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useUser(), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.status).toEqual('loading')
    })
  })
  it('updates status to loaded', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useUser(), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.status).toEqual('loaded')
    })
  })
  it('stores in cache if not fake', async () => {
    api.isLoggedIn = true
    api.isFake = false

    renderHook(() => useUser(), { wrapper })

    await waitFor(() => {
      expect(storage.cache['123_user']).toEqual('{"id":1}')
    })
  })
  it('does not store in cache if fake', async () => {
    api.isLoggedIn = true
    api.isFake = true

    renderHook(() => useUser(), { wrapper })

    await waitFor(() => {
      expect(storage.cache['123_user']).toEqual('{"id":2}')
    })
  })
  it('retries if api fails', async () => {
    api.isLoggedIn = true
    const error = new Error('fail')
    api.getUser.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useUser(), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('loading')
      expect(result.current.data).toEqual({ id: 2 })
    })
    await waitFor(() => {
      expect(result.current.status).toEqual('loaded')
      expect(result.current.data).toEqual({ id: 1 })
    })
  })
  it('gives up after 3 retries', async () => {
    api.isLoggedIn = true
    const error = new Error('fail')
    api.getUser.mockRejectedValueOnce(error)
    api.getUser.mockRejectedValueOnce(error)
    api.getUser.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useUser(), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('loading')
      expect(result.current.data).toEqual({ id: 2 })
    })
    await waitFor(() => {
      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('error')
      expect(result.current.data).toEqual({ id: 2 })
    })
  })
  it('reports if api fails', async () => {
    api.isLoggedIn = true
    const error = new Error('fail')
    api.getUser.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useUser(), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)

      expect(reporter.error).toHaveBeenCalledWith(
        error,
        'Error getting USER from API'
      )
    })
  })
})
