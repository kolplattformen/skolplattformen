import {User} from '../libs/api/lib';
import useAsyncStorage from './useAsyncStorage';

export default function usePersonalStorage<T>(
  user: User,
  storageKey: string,
  defaultValue: T,
): [T, (val: T) => void] {
  const internalKey =
    user && user.personalNumber ? user.personalNumber + '_' + storageKey : '';
  return useAsyncStorage(internalKey, defaultValue);
}
