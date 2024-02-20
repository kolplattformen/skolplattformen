import AsyncStorage from '@react-native-async-storage/async-storage'
import { act, renderHook } from '@testing-library/react'
import AppStorage from '../../services/appStorage'
import useSettingsStorage, { settingsState } from '../useSettingsStorage'

beforeEach(() => {
  AsyncStorage.clear()
  // TODO: This is a bit ugly. Should probably fix that.
  settingsState.settings.theme = 'light'
})

const prefix = AppStorage.settingsStorageKeyPrefix

test('use key prefix on set', async () => {
  const { result } = renderHook(() => useSettingsStorage('theme'))

  const [, setValue] = result.current

  await act(async () => {
    setValue('dark')
  })

  const data = await AsyncStorage.getItem(prefix + 'SETTINGS')
  const parsed = JSON.parse(data ?? '')

  expect(parsed.theme).toEqual('dark')
})

test('update value', async () => {
  const { result } = renderHook(() => useSettingsStorage('theme'))

  const [initValue, setValue] = result.current

  await act(async () => {
    setValue('dark')
  })

  const [updateValue] = result.current

  expect(initValue).toEqual('light')
  expect(updateValue).toEqual('dark')

  const data = await AsyncStorage.getItem(prefix + 'SETTINGS')
  const parsed = JSON.parse(data ?? '')

  expect(parsed.theme).toEqual('dark')
})
