import AsyncStorage from '@react-native-async-storage/async-storage'
import AppStorage from '../appStorage'

beforeEach(() => {
  jest.clearAllMocks()
})

const prefix = AppStorage.settingsStorageKeyPrefix

test('Sets setting with prefix in storage', async () => {
  await AppStorage.setSetting('key', 'value')

  expect(AsyncStorage.setItem).toHaveBeenCalledWith(
    prefix + 'key',
    JSON.stringify('value')
  )
})

test('Can get setting from storage', async () => {
  await AppStorage.setSetting('key', 'value')
  const result = await AppStorage.getSetting<string>('key')

  expect(result).toEqual('value')
  expect(AsyncStorage.getItem).toHaveBeenCalledWith(prefix + 'key')
})

test('Clear only settings', async () => {
  await AppStorage.setSetting('key', 'value')
  await AppStorage.setSetting('key2', 'value2')
  await AppStorage.setSetting('key3', 'value3')

  await AppStorage.setTemporaryItem('nonSetting', 'nonSettingValue')

  await AppStorage.clearAllSettings()

  const allKeys = await AsyncStorage.getAllKeys()

  expect(allKeys).toHaveLength(1)
  expect(allKeys[0]).toEqual('nonSetting')
})

test('Clear temporary items', async () => {
  await AppStorage.setSetting('settingKey1', 'settingValue1')
  await AppStorage.setSetting('settingKey2', 'settingValue2')
  await AppStorage.setSetting('settingKey3', 'settingValue3')
  await AppStorage.setTemporaryItem('tempKey1', 'tempValue1')
  await AppStorage.setTemporaryItem('tempKey2', 'tempValue2')
  await AppStorage.setTemporaryItem('tempKey3', 'tempValue3')

  await AppStorage.clearTemporaryItems()

  const allKeys = await AsyncStorage.getAllKeys()

  expect(allKeys).toHaveLength(3)
  expect(allKeys[0]).toEqual(
    AppStorage.settingsStorageKeyPrefix + 'settingKey1'
  )
})

test('Store temporary string in AsyncStorage', async () => {
  await AppStorage.setTemporaryItem('tempkey', 'tempvalue')

  expect(AsyncStorage.setItem).toHaveBeenCalledWith(
    'tempkey',
    JSON.stringify('tempvalue')
  )
})

test('Get temporary string from AsyncStorage', async () => {
  await AppStorage.getTemporaryItem('tempkey')

  expect(AsyncStorage.getItem).toHaveBeenCalledWith('tempkey')
})

test('Store temporary object in AsyncStorage', async () => {
  const obj = { a: 'foo', b: 5 }
  await AppStorage.setTemporaryItem('tempkey', obj)

  expect(AsyncStorage.setItem).toHaveBeenCalledWith(
    'tempkey',
    JSON.stringify(obj)
  )
})

test('Get temporary object from AsyncStorage', async () => {
  await AppStorage.getTemporaryItem('tempkey')

  expect(AsyncStorage.getItem).toHaveBeenCalledWith('tempkey')
})
