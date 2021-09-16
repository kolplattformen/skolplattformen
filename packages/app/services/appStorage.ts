import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@skolplattformen/embedded-api'

export default class AppStorage {
  static settingsStorageKeyPrefix = 'appsetting_'
  static tempStorageKeyPrefix = 'tempItem_'

  static async setSetting<T>(key: string, value: T) {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(this.settingsStorageKeyPrefix + key, jsonValue)
  }

  static async getSetting<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(
      this.settingsStorageKeyPrefix + key
    )
    return value ? (JSON.parse(value) as T) : null
  }

  static async setPersonalData<T>(user: User, key: string, value: T) {
    const jsonValue = JSON.stringify(value)
    if (user.personalNumber) {
      const storageKey = user.personalNumber + '_' + key
      await AsyncStorage.setItem(storageKey, jsonValue)
    }
  }

  static async getPersonalData<T>(user: User, key: string): Promise<T | null> {
    if (user.personalNumber) {
      const value = await AsyncStorage.getItem(user.personalNumber + '_' + key)
      return value ? (JSON.parse(value) as T) : null
    }
    return null
  }

  static async setTemporaryItem<T>(key: string, value: T) {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(this.tempStorageKeyPrefix + key, jsonValue)
  }

  static async getTemporaryItem<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(this.tempStorageKeyPrefix + key)
    return value ? (JSON.parse(value) as T) : null
  }

  static async clearAllSettings(): Promise<void> {
    const allKeys = await AsyncStorage.getAllKeys()
    const settingsKeys = allKeys.filter((x) =>
      x.startsWith(this.settingsStorageKeyPrefix)
    )
    await AsyncStorage.multiRemove(settingsKeys)
  }

  static async clearTemporaryItems() {
    const allKeys = await AsyncStorage.getAllKeys()
    const notSettingsKeys = allKeys.filter((x) =>
      x.startsWith(this.tempStorageKeyPrefix)
    )
    await AsyncStorage.multiRemove(notSettingsKeys)
  }

  static async clearPersonalData(user: User): Promise<void> {
    if (!user.personalNumber) return

    const allKeys = await AsyncStorage.getAllKeys()
    const personalDataKeys = allKeys.filter((x) =>
      x.startsWith(user.personalNumber ?? '')
    )
    await AsyncStorage.multiRemove(personalDataKeys)
  }

  static async nukeAllStorage() {
    await AsyncStorage.clear()
  }
}
