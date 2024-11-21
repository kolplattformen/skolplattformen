import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@skolplattformen/api'
import { act, renderHook } from '@testing-library/react'
import usePersonalStorage from '../usePersonalStorage'

beforeEach(async () => {
  jest.clearAllMocks()
  await AsyncStorage.clear()
})

const user: User = { personalNumber: '201701012393' }
const prefix = user.personalNumber + '_'

test('use key prefix on set', async () => {
  const { result } = renderHook(() => usePersonalStorage(user, 'key', ''))

  const [, setValue] = result.current
  await act(() => {
    setValue('foo')
  })

  expect(await AsyncStorage.getItem(prefix + 'key')).toEqual(
    JSON.stringify('foo')
  )
})

test('return inital value if no set', async () => {
  const { result } = renderHook(() =>
    usePersonalStorage(user, 'key', 'initialValue')
  )

  const [value] = result.current

  expect(value).toEqual('initialValue')
  expect(await AsyncStorage.getItem(prefix + 'key')).toEqual(null)
})

test('update value', async () => {
  const { result } = renderHook(() =>
    usePersonalStorage(user, 'key', 'initialValue')
  )

  const [initValue, setValue] = result.current

  await act(() => {
    setValue('update')
  })

  const [updateValue] = result.current

  expect(initValue).toEqual('initialValue')
  expect(updateValue).toEqual('update')

  expect(await AsyncStorage.getItem(prefix + 'key')).toEqual(
    JSON.stringify('update')
  )
})

test('do nothing if personalId is empty', async () => {
  const emptyUser: User = { personalNumber: '' }
  let hookUser = emptyUser
  const { result, rerender } = renderHook(() =>
    usePersonalStorage(hookUser, 'key', '')
  )

  await act(() => {
    const [, setValue] = result.current
    setValue('foo')
  })

  expect(AsyncStorage.setItem).not.toHaveBeenCalled()

  hookUser = user
  rerender()

  await act(() => {
    const [, setValue] = result.current
    setValue('foo')
  })

  expect(AsyncStorage.setItem).toHaveBeenCalled()
})
