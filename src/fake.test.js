import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import { ApiProvider } from '.'
import createStorage from './__mocks__/AsyncStorage'
import {
  useCalendar,
  useChildList,
  useClassmates,
  useMenu,
  useNews,
  useNotifications,
  useSchedule,
  useUser,
} from './hooks'
import store from './store'

const { default: init } = jest.requireActual('@skolplattformen/embedded-api')

const wait = (ms) => new Promise((res) => setTimeout(res, ms))

describe('hooks with fake data', () => {
  let api
  let storage
  const wrapper = ({ children }) => (
    <ApiProvider api={api} storage={storage}>{children}</ApiProvider>
  )
  beforeEach(async () => {
    api = init(() => { }, () => { })
    await api.login('121212121212')

    storage = createStorage({})
  })
  it('does not use cache', async () => {
    storage.cache.user = JSON.stringify({ user: 'cached' })
    await act(async () => {
      const {
        result,
        waitForNextUpdate,
      } = renderHook(() => useUser(), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.data).toEqual({
        firstName: 'Namn',
        lastName: 'Namnsson',
      })
    })
  })
  it('returns user', async () => {
    await act(async () => {
      const {
        result,
        waitForNextUpdate,
      } = renderHook(() => useUser(), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.data).toEqual({
        firstName: 'Namn',
        lastName: 'Namnsson',
      })
    })
  })
  it('returns child list', async () => {
    await act(async () => {
      const {
        result,
        waitForNextUpdate,
      } = renderHook(() => useChildList(), { wrapper })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.data).toHaveLength(2)
    })
  })
  describe('data belonging to one child', () => {
    let child
    beforeEach(async () => {
      [child] = await api.getChildren()
    })
    it('returns calendar', async () => {
      await act(async () => {
        const {
          result,
          waitForNextUpdate,
        } = renderHook(() => useCalendar(child), { wrapper })

        await waitForNextUpdate()
        await waitForNextUpdate()

        expect(result.current.data.length).toBeGreaterThan(1)
      })
    })
    it('returns classmates', async () => {
      await act(async () => {
        const {
          result,
          waitForNextUpdate,
        } = renderHook(() => useClassmates(child), { wrapper })

        await waitForNextUpdate()
        await waitForNextUpdate()

        expect(result.current.data.length).toBeGreaterThan(1)
      })
    })
    it('returns menu', async () => {
      await act(async () => {
        const {
          result,
          waitForNextUpdate,
        } = renderHook(() => useMenu(child), { wrapper })

        await waitForNextUpdate()
        await waitForNextUpdate()

        expect(result.current.data.length).toBeGreaterThan(1)
      })
    })
    it('returns news', async () => {
      await act(async () => {
        const {
          result,
          waitForNextUpdate,
        } = renderHook(() => useNews(child), { wrapper })

        await waitForNextUpdate()
        await waitForNextUpdate()

        expect(result.current.data.length).toBeGreaterThan(1)
      })
    })
    it('returns notifications', async () => {
      await act(async () => {
        const {
          result,
          waitForNextUpdate,
        } = renderHook(() => useNotifications(child), { wrapper })

        await waitForNextUpdate()
        await waitForNextUpdate()

        expect(result.current.data.length).toBeGreaterThan(1)
      })
    })
    it('returns schedule', async () => {
      const from = '2021-01-01'
      const to = '2021-01-08'
      await act(async () => {
        const {
          result,
          waitForNextUpdate,
        } = renderHook(() => useSchedule(child, from, to), { wrapper })

        await waitForNextUpdate()
        await waitForNextUpdate()

        // No fake schedule in embedded-api yet
        expect(result.current.data.length).not.toBeGreaterThan(1)
      })
    })

  })
  it('handles reloads', async () => {
    await act(async () => {
      store.dispatch({ type: 'CLEAR' })

      const [child] = await api.getChildren()

      const {
        result,
        waitForNextUpdate,
      } = renderHook(() => useNotifications(child), { wrapper })

      await waitForNextUpdate()
      expect(result.current.status).toEqual('loaded')

      result.current.reload()
      await wait(30)

      expect(result.current.status).toEqual('loaded')
    })
  })
})
