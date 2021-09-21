import { useEffect, useState } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { User } from '@skolplattformen/embedded-api'

export default function usePersonalStorage<T>(
  user: User,
  storageKey: string,
  defaultValue: T
): [T, (val: T) => void] {
  const internalKey = user.personalNumber + '_' + storageKey
  const [storageItem, setStorageItem] = useState(defaultValue)
  const { getItem, setItem } = useAsyncStorage(internalKey)

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
