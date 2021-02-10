import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { ApiProvider } from './provider'
import { useNewsDetails } from './hooks'
import store from './store'
import init from './__mocks__/@skolplattformen/embedded-api'
import createStorage from './__mocks__/AsyncStorage'
import reporter from './__mocks__/reporter'

const pause = (ms = 0) => new Promise((r) => setTimeout(r, ms))

describe('useNewsDetails(child, newsItem)', () => {
  let api
  let storage
  let response
  let child
  let newsItem
  const wrapper = ({ children }) => (
    <ApiProvider
      api={api}
      storage={storage}
      reporter={reporter}
    >
      {children}
    </ApiProvider>
  )
  beforeEach(() => {
    response = { id: '1337', modified: 'now' }
    api = init()
    api.getNewsDetails.mockImplementation(() => (
      new Promise((res) => {
        setTimeout(() => res(response), 50)
      })
    ))
    storage = createStorage({
      news_details_1337: { id: '1337', modified: 'yesterday' },
    }, 2)
    child = { id: 10 }
    newsItem = { id: '1337', modified: 'this morning' }
  })
  afterEach(async () => {
    await act(async () => {
      await pause(70)
      store.dispatch({ entity: 'ALL', type: 'CLEAR' })
    })
  })
  it('returns correct initial value', () => {
    const { result } = renderHook(() => useNewsDetails(child, newsItem), { wrapper })

    expect(result.current.status).toEqual('pending')
  })
  it('calls api', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const { waitForNextUpdate } = renderHook(() => useNewsDetails(child, newsItem), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(api.getNewsDetails).toHaveBeenCalled()
    })
  })
  it('only calls api once', async () => {
    await act(async () => {
      api.isLoggedIn = true
      renderHook(() => useNewsDetails(child, newsItem), { wrapper })
      const { waitForNextUpdate } = renderHook(() => useNewsDetails(child, newsItem), { wrapper })

      await waitForNextUpdate()
      renderHook(() => useNewsDetails(child, newsItem), { wrapper })
      await waitForNextUpdate()
      renderHook(() => useNewsDetails(child, newsItem), { wrapper })
      await waitForNextUpdate()

      const { result } = renderHook(() => useNewsDetails(child, newsItem), { wrapper })

      expect(api.getNewsDetails).toHaveBeenCalledTimes(1)
      expect(result.current.status).toEqual('loaded')
    })
  })
  it('calls cache', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const { result, waitForNextUpdate } = renderHook(() => useNewsDetails(child, newsItem), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.data).toEqual({ id: '1337' })
    })
  })
  it('updates status to loading', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const { result, waitForNextUpdate } = renderHook(() => useNewsDetails(child, newsItem), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.status).toEqual('loading')
    })
  })
  it('updates status to loaded', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const { result, waitForNextUpdate } = renderHook(() => useNewsDetails(child, newsItem), { wrapper })

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

      const { waitForNextUpdate } = renderHook(() => useNewsDetails(child, newsItem), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()
      await pause(20)

      expect(storage.cache.news_1).toEqual('{"id":"1337"}')
    })
  })
  it('does not store in cache if fake', async () => {
    await act(async () => {
      api.isLoggedIn = true
      api.isFake = true

      const { waitForNextUpdate } = renderHook(() => useNewsDetails(child, newsItem), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await pause(20)

      expect(storage.cache.news_2).toEqual('{"id":"1337"}')
    })
  })
  it('retries if api fails', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const error = new Error('fail')
      api.getNewsDetails.mockRejectedValueOnce(error)

      const { result, waitForNextUpdate } = renderHook(() => useNewsDetails(child, newsItem), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('loading')
      expect(result.current.data).toEqual({ id: '1337' })

      jest.advanceTimersToNextTimer()

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.status).toEqual('loaded')
      expect(result.current.data).toEqual({ id: '1337' })
    })
  })
  it('gives up after 3 retries', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const error = new Error('fail')
      api.getNewsDetails.mockRejectedValueOnce(error)
      api.getNewsDetails.mockRejectedValueOnce(error)
      api.getNewsDetails.mockRejectedValueOnce(error)

      const { result, waitForNextUpdate } = renderHook(() => useNewsDetails(child, newsItem), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('loading')
      expect(result.current.data).toEqual({ id: '1337' })

      jest.advanceTimersToNextTimer()

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.error).toEqual(error)
      expect(result.current.status).toEqual('error')
      expect(result.current.data).toEqual({ id: '1337' })
    })
  })
  it('reports if api fails', async () => {
    await act(async () => {
      api.isLoggedIn = true
      const error = new Error('fail')
      api.getNewsDetails.mockRejectedValueOnce(error)

      const { result, waitForNextUpdate } = renderHook(() => useNewsDetails(child, newsItem), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.error).toEqual(error)

      expect(reporter.error).toHaveBeenCalledWith(error, 'Error getting NEWS_DETAILS from API')
    })
  })
})
