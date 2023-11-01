import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { ApiProvider } from '../provider'
import { useSkola24Children } from '../hooks'
import store from '../store'
import init from '../__mocks__/@skolplattformen/embedded-api'
import createStorage from '../__mocks__/AsyncStorage'
import reporter from '../__mocks__/reporter'

const pause = (ms = 0) => new Promise((r) => setTimeout(r, ms))

describe('useSkola24Children()', () => {
  let api
  let storage
  let response
  const wrapper = ({ children }) => (
    <ApiProvider api={api} storage={storage} reporter={reporter}>
      {children}
    </ApiProvider>
  )
  beforeEach(() => {
    response = [{ personGuid: '1' }]
    api = init()
    api.getPersonalNumber.mockReturnValue('123')
    api.getSkola24Children.mockImplementation(
      () =>
        new Promise((res) => {
          setTimeout(() => res(response), 50)
        })
    )
    storage = createStorage(
      {
        '123_skola24_children': [{ personGuid: '2' }],
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
    const { result } = renderHook(() => useSkola24Children(), { wrapper })

    expect(result.current.status).toEqual('pending')
  })

  it('calls api', async () => {
    api.isLoggedIn = true
    const { waitForNextUpdate } = renderHook(() => useSkola24Children(), {
      wrapper,
    })

    await waitFor(() => expect(api.getSkola24Children).toHaveBeenCalled())
  })

  it('only calls api once', async () => {
    api.isLoggedIn = true
    renderHook(() => useSkola24Children(), { wrapper })
    renderHook(() => useSkola24Children(), {
      wrapper,
    })

    renderHook(() => useSkola24Children(), { wrapper })

    renderHook(() => useSkola24Children(), { wrapper })

    const { result } = renderHook(() => useSkola24Children(), { wrapper })
    await waitFor(() => {
      expect(api.getSkola24Children).toHaveBeenCalledTimes(1)
      expect(result.current.status).toEqual('loaded')
    })
  })

  it('calls cache', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useSkola24Children(), { wrapper })

    await waitFor(() =>
      expect(result.current.data).toEqual([{ personGuid: '2' }])
    )
  })
  it('updates status to loading', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useSkola24Children(), { wrapper })

    await waitFor(() => expect(result.current.status).toEqual('loading'))
  })

  it('updates status to loaded', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useSkola24Children(), { wrapper })

    await waitFor(() => expect(result.current.status).toEqual('loaded'))
  })

  it('stores in cache if not fake', async () => {
    api.isLoggedIn = true
    api.isFake = false

    renderHook(() => useSkola24Children(), {
      wrapper,
    })

    await waitFor(() =>
      expect(storage.cache['123_skola24_children']).toEqual(
        '[{"personGuid":"1"}]'
      )
    )
  })
  it('does not store in cache if fake', async () => {
    api.isLoggedIn = true
    api.isFake = true

    renderHook(() => useSkola24Children(), {
      wrapper,
    })

    await waitFor(() =>
      expect(storage.cache['123_skola24_children']).toEqual(
        '[{"personGuid":"2"}]'
      )
    )
  })

  it('retries if api fails', async () => {
    api.isLoggedIn = true
    const error = new Error('fail')
    api.getSkola24Children.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useSkola24Children(), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('loading')
      expect(result.current.data).toEqual([{ personGuid: '2' }])
    })

    await waitFor(() => {
      expect(result.current.status).toEqual('loaded')
      expect(result.current.data).toEqual([{ personGuid: '1' }])
    })
  })

  it('gives up after 3 retries', async () => {
    api.isLoggedIn = true
    const error = new Error('fail')
    api.getSkola24Children.mockRejectedValueOnce(error)
    api.getSkola24Children.mockRejectedValueOnce(error)
    api.getSkola24Children.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useSkola24Children(), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('loading')
      expect(result.current.data).toEqual([{ personGuid: '2' }])
    })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('error')
      expect(result.current.data).toEqual([{ personGuid: '2' }])
    })
  })

  it('reports if api fails', async () => {
    api.isLoggedIn = true
    const error = new Error('fail')
    api.getSkola24Children.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useSkola24Children(), { wrapper })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)

      expect(reporter.error).toHaveBeenCalledWith(
        error,
        'Error getting SKOLA24_CHILDREN from API'
      )
    })
  })
})
