import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { ApiProvider } from '../provider'
import { useMenu } from '../hooks'
import store from '../store'
import init from '../__mocks__/@skolplattformen/embedded-api'
import createStorage from '../__mocks__/AsyncStorage'
import reporter from '../__mocks__/reporter'

const pause = (ms = 0) => new Promise((r) => setTimeout(r, ms))

describe('useMenu(child)', () => {
  let api
  let storage
  let response
  let child
  const wrapper = ({ children }) => (
    <ApiProvider api={api} storage={storage} reporter={reporter}>
      {children}
    </ApiProvider>
  )
  beforeEach(() => {
    response = [{ id: 1 }]
    api = init()
    api.getPersonalNumber.mockReturnValue('123')
    api.getMenu.mockImplementation(
      () =>
        new Promise((res) => {
          setTimeout(() => res(response), 50)
        })
    )
    storage = createStorage(
      {
        '123_menu_10': [{ id: 2 }],
      },
      2
    )
    child = { id: 10 }
  })
  afterEach(async () => {
    await act(async () => {
      await pause(70)
      store.dispatch({ entity: 'ALL', type: 'CLEAR' })
    })
  })
  it('returns correct initial value', () => {
    const { result } = renderHook(() => useMenu(child), { wrapper })

    expect(result.current.status).toEqual('pending')
  })
  it('calls api', async () => {
    api.isLoggedIn = true
    renderHook(() => useMenu(child), {
      wrapper,
    })

    expect(api.getMenu).toHaveBeenCalled()
  })
  it('only calls api once', async () => {
    api.isLoggedIn = true
    renderHook(() => useMenu(child), { wrapper })
    renderHook(() => useMenu(child), {
      wrapper,
    })

    renderHook(() => useMenu(child), { wrapper })

    renderHook(() => useMenu(child), { wrapper })

    const { result } = renderHook(() => useMenu(child), { wrapper })
    await waitFor(() => {
      expect(api.getMenu).toHaveBeenCalledTimes(1)
      expect(result.current.status).toEqual('loaded')
    })
  })

  it('calls cache', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useMenu(child), {
      wrapper,
    })

    await waitFor(() => expect(result.current.data).toEqual([{ id: 2 }]))
  })
  it('updates status to loading', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useMenu(child), {
      wrapper,
    })

    await waitFor(() => expect(result.current.status).toEqual('loading'))
  })

  it('updates status to loaded', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useMenu(child), {
      wrapper,
    })

    await waitFor(() => expect(result.current.status).toEqual('loading'))
  })

  it('stores in cache if not fake', async () => {
    api.isLoggedIn = true
    api.isFake = false

    renderHook(() => useMenu(child), {
      wrapper,
    })

    await waitFor(() =>
      expect(storage.cache['123_menu_10']).toEqual('[{"id":1}]')
    )
  })

  it('does not store in cache if fake', async () => {
    api.isLoggedIn = true
    api.isFake = true

    renderHook(() => useMenu(child), {
      wrapper,
    })

    await waitFor(() => {
      expect(storage.cache['123_menu_10']).toEqual('[{"id":2}]')
    })
  })
  it('retries if api fails', async () => {
    api.isLoggedIn = true
    const error = new Error('fail')
    api.getMenu.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useMenu(child), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('loading')
      expect(result.current.data).toEqual([{ id: 2 }])
    })

    await waitFor(() => {
      expect(result.current.status).toEqual('loaded')
      expect(result.current.data).toEqual([{ id: 1 }])
    })
  })
  it('gives up after 3 retries', async () => {
    api.isLoggedIn = true
    const error = new Error('fail')
    api.getMenu.mockRejectedValueOnce(error)
    api.getMenu.mockRejectedValueOnce(error)
    api.getMenu.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useMenu(child), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('loading')
      expect(result.current.data).toEqual([{ id: 2 }])
    })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('error')
      expect(result.current.data).toEqual([{ id: 2 }])
    })
  })
  it('reports if api fails', async () => {
    api.isLoggedIn = true
    const error = new Error('fail')
    api.getMenu.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useMenu(child), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)

      expect(reporter.error).toHaveBeenCalledWith(
        error,
        'Error getting MENU from API'
      )
    })
  })
})
