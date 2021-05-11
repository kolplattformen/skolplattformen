import AsyncStorage from '@react-native-async-storage/async-storage'

export default class AppStorage {
  static settingsStorageKeyPrefix = 'appsetting_'

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

  static async setTemporaryItem<T>(key: string, value: T) {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  }

  static async getTemporaryItem<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : null
  }

  static async clearAllSettings(): Promise<void> {
    const allKeys = await AsyncStorage.getAllKeys()
    const settingsKeys = allKeys.filter((x) =>
      x.startsWith(this.settingsStorageKeyPrefix)
    )
    await AsyncStorage.multiRemove(settingsKeys)
    console.log('Cleared all settings')
  }

  static async clearTemporaryItems() {
    const allKeys = await AsyncStorage.getAllKeys()
    const notSettingsKeys = allKeys.filter(
      (x) => !x.startsWith(this.settingsStorageKeyPrefix)
    )
    await AsyncStorage.multiRemove(notSettingsKeys)
    console.log('Cleared all temp items')
  }
}
