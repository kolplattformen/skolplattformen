import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { ApiProvider } from '../provider'
import { useTimetable } from '../hooks'
import store from '../store'
import init from '../__mocks__/@skolplattformen/embedded-api'
import createStorage from '../__mocks__/AsyncStorage'
import reporter from '../__mocks__/reporter'

const pause = (ms = 0) => new Promise((r) => setTimeout(r, ms))

describe('useTimetable(child, week, year, lang)', () => {
  let api
  let storage
  let response
  let child
  let week
  let year
  let lang
  const wrapper = ({ children }) => (
    <ApiProvider api={api} storage={storage} reporter={reporter}>
      {children}
    </ApiProvider>
  )
  beforeEach(() => {
    response = [{ id: 1 }]
    api = init()
    api.getPersonalNumber.mockReturnValue('123')
    api.getTimetable.mockImplementation(
      () =>
        new Promise((res) => {
          setTimeout(() => res(response), 50)
        })
    )
    storage = createStorage(
      {
        '123_timetable_10_15_2021_sv': [{ id: 2 }],
      },
      2
    )
    child = { personGuid: '10' }
    week = 15
    year = 2021
    lang = 'sv'
  })
  afterEach(async () => {
    await act(async () => {
      await pause(70)
      store.dispatch({ entity: 'ALL', type: 'CLEAR' })
    })
  })
  it('returns correct initial value', () => {
    const { result } = renderHook(() => useTimetable(child, week, year, lang), {
      wrapper,
    })

    expect(result.current.status).toEqual('pending')
  })
  it('calls api', async () => {
    api.isLoggedIn = true
    renderHook(() => useTimetable(child, week, year, lang), { wrapper })

    await waitFor(() => expect(api.getTimetable).toHaveBeenCalled())
  })

  it('only calls api once', async () => {
    api.isLoggedIn = true
    renderHook(() => useTimetable(child, week, year, lang), { wrapper })
    renderHook(() => useTimetable(child, week, year, lang), { wrapper })

    renderHook(() => useTimetable(child, week, year, lang), { wrapper })

    renderHook(() => useTimetable(child, week, year, lang), { wrapper })

    const { result } = renderHook(() => useTimetable(child, week, year, lang), {
      wrapper,
    })
    await waitFor(() => {
      expect(api.getTimetable).toHaveBeenCalledTimes(1)
      expect(result.current.status).toEqual('loaded')
    })
  })

  it('calls cache', async () => {
    api.isLoggedIn = true

    const { result } = renderHook(() => useTimetable(child, week, year, lang), {
      wrapper,
    })

    await waitFor(() => expect(result.current.data).toEqual([{ id: 2 }]))
  })
  it('updates status to loading', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useTimetable(child, week, year, lang), {
      wrapper,
    })

    await waitFor(() => expect(result.current.status).toEqual('loading'))
  })

  it('updates status to loaded', async () => {
    api.isLoggedIn = true
    const { result } = renderHook(() => useTimetable(child, week, year, lang), {
      wrapper,
    })

    await waitFor(() => expect(result.current.status).toEqual('loaded'))
  })

  it('stores in cache if not fake', async () => {
    api.isLoggedIn = true
    api.isFake = false

    renderHook(() => useTimetable(child, week, year, lang), { wrapper })

    await waitFor(() => {
      expect(storage.cache['123_timetable_10_15_2021_sv']).toEqual('[{"id":1}]')
    })
  })
  it('does not store in cache if fake', async () => {
    api.isLoggedIn = true
    api.isFake = true

    renderHook(() => useTimetable(child, week, year, lang), { wrapper })

    await waitFor(() =>
      expect(storage.cache['123_timetable_10_15_2021_sv']).toEqual('[{"id":2}]')
    )
  })
  it('retries if api fails', async () => {
    api.isLoggedIn = true
    const error = new Error('fail')
    api.getTimetable.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useTimetable(child, week, year, lang), {
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
    api.getTimetable.mockRejectedValueOnce(error)
    api.getTimetable.mockRejectedValueOnce(error)
    api.getTimetable.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useTimetable(child, week, year, lang), {
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
    api.getTimetable.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useTimetable(child, week, year, lang), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.error).toEqual(error)

      expect(reporter.error).toHaveBeenCalledWith(
        error,
        'Error getting TIMETABLE from API'
      )
    })
  })
})
