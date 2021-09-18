import { useEffect, useState } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import AppStorage from '../services/appStorage'

export default function useSettingsStorage<T>(
  storageKey: string,
  defaultValue: T
): [T, (val: T) => void] {
  const settingsKey = AppStorage.settingsStorageKeyPrefix + storageKey
  const [storageItem, setStorageItem] = useState(defaultValue)
  const { getItem, setItem } = useAsyncStorage(settingsKey)

  async function setStoredValue(value: T) {
    try {
      await setItem(JSON.stringify(value))
      setStorageItem(value)
    } catch (e) {}
  }

  useEffect(() => {
    async function getStoredValue() {
      const data = await getItem()
      if (typeof data === 'string') setStorageItem(JSON.parse(data))
    }

    getStoredValue()
  }, [getItem])

  return [
    storageItem !== undefined ? storageItem : defaultValue,
    setStoredValue,
  ]
}
