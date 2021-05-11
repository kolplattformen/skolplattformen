import { renderHook, act } from '@testing-library/react-hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useSettingsStorage from '../useSettingsStorage'
import AppStorage from '../../services/appStorage'

beforeEach(() => {
  AsyncStorage.clear()
})

const prefix = AppStorage.settingsStorageKeyPrefix

test('use key prefix on set', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useSettingsStorage('key', '')
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
  const { result } = renderHook(() => useSettingsStorage('key', 'initialValue'))

  const [value] = result.current

  expect(value).toEqual('initialValue')
  expect(await AsyncStorage.getItem(prefix + 'key')).toEqual(null)
})

test('update value', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useSettingsStorage('key', 'initialValue')
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
