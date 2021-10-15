import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { ApiProvider } from '.'
import {
  useCalendar,
  useClassmates,
  useEtjanstChildren,
  useMenu,
  useNews,
  useNotifications,
  useSchedule,
  useUser,
} from './hooks'
import store from './store'
import createStorage from './__mocks__/AsyncStorage'

const { default: init } = jest.requireActual(
  '@skolplattformen/api-skolplattformen'
)

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

describe('hooks with fake data', () => {
  let api: any
  let storage: any
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ApiProvider api={api} storage={storage}>
      {children}
    </ApiProvider>
  )
  beforeEach(async () => {
    api = init(
      () => {
        // noop
      },
      () => {
        //noop
      }
    )
    await api.login('121212121212')

    storage = createStorage({})
  })
  it('does not use cache', async () => {
    storage.cache.user = JSON.stringify({ user: 'cached' })
    await act(async () => {
      const { result, waitForNextUpdate } = renderHook(() => useUser(), {
        wrapper,
      })

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.data).toEqual({
        firstName: 'Namn',
        lastName: 'Namnsson',
        isAuthenticated: true,
        personalNumber: '195001182046',
      })
    })
  })
  it('returns user', async () => {
    await act(async () => {
      const { result, waitForNextUpdate } = renderHook(() => useUser(), {
        wrapper,
      })

      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.data).toEqual({
        firstName: 'Namn',
        lastName: 'Namnsson',
        isAuthenticated: true,
        personalNumber: '195001182046',
      })
    })
  })
  it('returns child list', async () => {
    await act(async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useEtjanstChildren(),
        { wrapper }
      )

      await waitForNextUpdate()
      await waitForNextUpdate()
      await waitForNextUpdate()

      expect(result.current.data).toHaveLength(2)
    })
  })
  describe('data belonging to one child', () => {
    let child: any
    beforeEach(async () => {
      ;[child] = await api.getChildren()
    })
    it('returns calendar', async () => {
      await act(async () => {
        const { result, waitForNextUpdate } = renderHook(
          () => useCalendar(child),
          { wrapper }
        )

        await waitForNextUpdate()
        await waitForNextUpdate()

        expect(result.current.data.length).toBeGreaterThan(1)
      })
    })
    it('returns classmates', async () => {
      await act(async () => {
        const { result, waitForNextUpdate } = renderHook(
          () => useClassmates(child),
          { wrapper }
        )

        await waitForNextUpdate()
        await waitForNextUpdate()

        expect(result.current.data.length).toBeGreaterThan(1)
      })
    })
    it('returns menu', async () => {
      await act(async () => {
        const { result, waitForNextUpdate } = renderHook(() => useMenu(child), {
          wrapper,
        })

        await waitForNextUpdate()
        await waitForNextUpdate()

        expect(result.current.data.length).toBeGreaterThan(1)
      })
    })
    it('returns news', async () => {
      await act(async () => {
        const { result, waitForNextUpdate } = renderHook(() => useNews(child), {
          wrapper,
        })

        await waitForNextUpdate()
        await waitForNextUpdate()

        expect(result.current.data.length).toBeGreaterThan(1)
      })
    })
    it('returns notifications', async () => {
      await act(async () => {
        const { result, waitForNextUpdate } = renderHook(
          () => useNotifications(child),
          { wrapper }
        )

        await waitForNextUpdate()
        await waitForNextUpdate()

        expect(result.current.data.length).toBeGreaterThan(1)
      })
    })
    it('returns schedule', async () => {
      const from = '2021-01-01'
      const to = '2021-01-08'
      await act(async () => {
        const { result, waitForNextUpdate } = renderHook(
          () => useSchedule(child, from, to),
          { wrapper }
        )

        await waitForNextUpdate()
        await waitForNextUpdate()

        // No fake schedule in embedded-api yet
        expect(result.current.data.length).not.toBeGreaterThan(1)
      })
    })
  })
  it('handles reloads', async () => {
    await act(async () => {
      store.dispatch({ type: 'CLEAR' } as any) // fixes test for invalid type

      const [child] = await api.getChildren()

      const { result, waitForNextUpdate } = renderHook(
        () => useNotifications(child),
        { wrapper }
      )

      await waitForNextUpdate()
      expect(result.current.status).toEqual('loaded')

      result.current.reload()
      await wait(30)

      expect(result.current.status).toEqual('loaded')
    })
  })
})
