import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { ApiProvider } from '../provider'
import { useChildList } from '../hooks'
import store from '../store'
import init from '../__mocks__/@skolplattformen/embedded-api'
import createStorage from '../__mocks__/AsyncStorage'
import reporter from '../__mocks__/reporter'
import { etjanstChildren } from '../reducers'

const pause = (ms = 0) => new Promise((r) => setTimeout(r, ms))

describe('useChildList()', () => {
  let api
  let storage
  let echildrenCache
  let skola24Cache
  let echildrenResponse
  let skola24Response
  const wrapper = ({ children }) => (
    <ApiProvider api={api} storage={storage} reporter={reporter}>
      {children}
    </ApiProvider>
  )
  beforeEach(() => {
    echildrenCache = [{ id: 2, name: 'Uwe Übrink (elev)' }]
    skola24Cache = [
      { personGuid: '2', firstName: 'Uwe', lastName: 'Vredstein Übrink' },
    ]

    echildrenResponse = [{ id: 1, name: 'Uwe Übrink (elev)' }]
    skola24Response = [
      { personGuid: '1', firstName: 'Uwe', lastName: 'Vredstein Übrink' },
    ]

    api = init()
    api.getPersonalNumber.mockReturnValue('123')

    api.getChildren.mockImplementation(
      () =>
        new Promise((res) => {
          setTimeout(() => res(echildrenResponse), 50)
        })
    )
    api.getSkola24Children.mockImplementation(
      () =>
        new Promise((res) => {
          setTimeout(() => res(skola24Response), 50)
        })
    )
    storage = createStorage(
      {
        '123_etjanst_children': echildrenCache,
        '123_skola24_children': skola24Cache,
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
    const { result } = renderHook(() => useChildList(), { wrapper })

    expect(result.current.status).toEqual('pending')
  })

  it('calls api', async () => {
    api.isLoggedIn = true
    renderHook(() => useChildList(), {
      wrapper,
    })

    await waitFor(() => {
      expect(api.getChildren).toHaveBeenCalled()
      expect(api.getSkola24Children).toHaveBeenCalled()
    })
  })

  it('only calls api once', async () => {
    api.isLoggedIn = true
    renderHook(() => useChildList(), { wrapper })
    renderHook(() => useChildList(), {
      wrapper,
    })

    renderHook(() => useChildList(), { wrapper })

    renderHook(() => useChildList(), { wrapper })

    const { result } = renderHook(() => useChildList(), { wrapper })
    await waitFor(() => {
      expect(api.getChildren).toHaveBeenCalledTimes(1)
      expect(api.getSkola24Children).toHaveBeenCalledTimes(1)
      expect(result.current.status).toEqual('loaded')
    })
  })

  it('calls cache', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useChildList(), {
      wrapper,
    })

    await waitFor(() =>
      expect(result.current.data).toEqual([
        {
          id: 2,
          name: 'Uwe Übrink (elev)',
          personGuid: '2',
          firstName: 'Uwe',
          lastName: 'Vredstein Übrink',
        },
      ])
    )
  })

  it('updates status to loading', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useChildList(), {
      wrapper,
    })

    await waitFor(() => expect(result.current.status).toEqual('loading'))
  })

  it('updates status to loaded', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useChildList(), {
      wrapper,
    })

    await waitFor(() => expect(result.current.status).toEqual('loaded'))
  })

  it('stores in cache if not fake', async () => {
    api.isLoggedIn = true
    api.isFake = false

    renderHook(() => useChildList(), {
      wrapper,
    })

    await waitFor(() => {
      expect(storage.cache['123_etjanst_children']).toEqual(
        JSON.stringify(echildrenResponse)
      )
      expect(storage.cache['123_skola24_children']).toEqual(
        JSON.stringify(skola24Response)
      )
    })
  })

  it('does not store in cache if fake', async () => {
    api.isLoggedIn = true
    api.isFake = true

    const { result } = renderHook(() => useChildList(), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.status).toEqual('loaded')
      expect(storage.cache['123_etjanst_children']).toEqual(
        JSON.stringify(echildrenCache)
      )
      expect(storage.cache['123_skola24_children']).toEqual(
        JSON.stringify(skola24Cache)
      )
    })
  })

  it.skip('retries if etjanst-api fails', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const error = new Error('fail')
      api.getChildren.mockRejectedValueOnce(error)

      const { result, waitForNextUpdate } = renderHook(() => useChildList(), {
        wrapper,
      })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('loading')
      expect(result.current.data).toEqual(echildrenCache)

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.status).toEqual('loaded')
      expect(result.current.data).toEqual([
        {
          id: 1,
          name: 'Uwe Übrink (elev)',
          personGuid: '1',
          firstName: 'Uwe',
          lastName: 'Vredstein Übrink',
        },
      ])
    })
  })

  it.skip('gives up after 3 retries', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const error = new Error('fail')
      api.getChildren.mockRejectedValueOnce(error)
      api.getChildren.mockRejectedValueOnce(error)
      api.getChildren.mockRejectedValueOnce(error)

      const { result, waitForNextUpdate } = renderHook(() => useChildList(), {
        wrapper,
      })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('loading')
      expect(result.current.data).toEqual(echildrenCache)

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('error')
      expect(result.current.data).toEqual([
        {
          id: 2,
          name: 'Uwe Übrink (elev)',
          personGuid: '1',
          firstName: 'Uwe',
          lastName: 'Vredstein Übrink',
        },
      ])
    })
  })

  it('reports if api fails', async () => {
    api.isLoggedIn = true
    const error = new Error('fail')
    api.getChildren.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useChildList(), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)

      expect(reporter.error).toHaveBeenCalledWith(
        error,
        'Error getting ETJANST_CHILDREN from API'
      )
    })
  })
})
