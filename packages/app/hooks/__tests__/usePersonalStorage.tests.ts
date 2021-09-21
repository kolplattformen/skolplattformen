import { renderHook, act } from '@testing-library/react-hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import usePersonalStorage from '../usePersonalStorage'
import { User } from '@skolplattformen/embedded-api'

beforeEach(() => {
  AsyncStorage.clear()
})

const user: User = { personalNumber: '201701012393' }
const prefix = user.personalNumber + '_'

test('use key prefix on set', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    usePersonalStorage(user, 'key', '')
  )

  act(() => {
    const [, setValue] = result.current
    setValue('foo')
  })

  await waitForNextUpdate()

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
  const { result, waitForNextUpdate } = renderHook(() =>
    usePersonalStorage(user, 'key', 'initialValue')
  )

  const [initValue, setValue] = result.current

  act(() => {
    setValue('update')
  })

  await waitForNextUpdate()

  const [updateValue] = result.current

  expect(initValue).toEqual('initialValue')
  expect(updateValue).toEqual('update')

  expect(await AsyncStorage.getItem(prefix + 'key')).toEqual(
    JSON.stringify('update')
  )
})
