import AsyncStorage from '@react-native-async-storage/async-storage'

export const keys: Array<string> = ['ssn']

export const clearCache = () => {
  AsyncStorage.multiRemove(keys)
}
