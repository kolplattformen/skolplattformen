import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export default function useAsyncStorage<T>(
  storageKey: string,
  defaultValue: T,
): [T, (val: T) => void] {
  const [storageItem, setStorageItem] = useState(defaultValue);

  async function setStoredValue(value: T) {
    try {
      if (!storageKey) return;
      await AsyncStorage.setItem(storageKey, JSON.stringify(value));
      setStorageItem(value);
    } catch (e) {
      // noop
    }
  }

  useEffect(() => {
    async function getStoredValue() {
      try {
        const data = await AsyncStorage.getItem(storageKey);
        if (typeof data === 'string') setStorageItem(JSON.parse(data));
      } catch (e) {
        // noop
      }
    }

    getStoredValue();
  }, [storageKey]);

  return [
    storageItem !== undefined ? storageItem : defaultValue,
    setStoredValue,
  ];
}
