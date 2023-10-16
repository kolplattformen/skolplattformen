import useAsyncStorage from './useAsyncStorage';
import AppStorage from '../services/appStorage';

export default function useTempStorage<T>(
  storageKey: string,
  defaultValue: T,
): [T, (val: T) => void] {
  const tempKey = AppStorage.tempStorageKeyPrefix + storageKey;
  return useAsyncStorage(tempKey, defaultValue);
}
