import useAsyncStorage from './useAsyncStorage'
import AppStorage from '../services/appStorage'

export default function useSettingsStorage<T>(
  storageKey: string,
  defaultValue: T
): [T, (val: T) => void] {
  const settingsKey = AppStorage.settingsStorageKeyPrefix + storageKey
  return useAsyncStorage(settingsKey, defaultValue)
}
