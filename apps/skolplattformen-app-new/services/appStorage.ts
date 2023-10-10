import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../libs/api/lib';

export default class AppStorage {
  static settingsStorageKeyPrefix = 'appsetting_';
  static tempStorageKeyPrefix = 'tempItem_';

  /**
   * Stores a setting
   * @param key
   * @param value
   */
  static async setSetting<T>(key: string, value: T) {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(this.settingsStorageKeyPrefix + key, jsonValue);
  }

  /**
   * Gets a stored setting
   * @param key
   * @returns
   */
  static async getSetting<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(
      this.settingsStorageKeyPrefix + key,
    );
    return value ? (JSON.parse(value) as T) : null;
  }

  /**
   * Stores a personal data item
   * @param user
   * @param key
   * @param value
   */
  static async setPersonalData<T>(user: User, key: string, value: T) {
    const jsonValue = JSON.stringify(value);
    if (user.personalNumber) {
      const storageKey = user.personalNumber + '_' + key;
      await AsyncStorage.setItem(storageKey, jsonValue);
    }
  }

  /**
   * Get stored personal data
   * @param user
   * @param key
   * @returns
   */
  static async getPersonalData<T>(user: User, key: string): Promise<T | null> {
    if (user.personalNumber) {
      const value = await AsyncStorage.getItem(user.personalNumber + '_' + key);
      return value ? (JSON.parse(value) as T) : null;
    }
    return null;
  }

  /**
   * Stores a temporary items. The items are cleared at logout.
   * Think of this as a session storage
   * @param key
   * @param value
   */
  static async setTemporaryItem<T>(key: string, value: T) {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(this.tempStorageKeyPrefix + key, jsonValue);
  }

  /**
   * Gets a temporary stored item
   * @param key
   * @returns
   */
  static async getTemporaryItem<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(this.tempStorageKeyPrefix + key);
    return value ? (JSON.parse(value) as T) : null;
  }

  /**
   *  Clears all settings
   */
  static async clearAllSettings(): Promise<void> {
    const allKeys = await AsyncStorage.getAllKeys();
    const settingsKeys = allKeys.filter(x =>
      x.startsWith(this.settingsStorageKeyPrefix),
    );
    await AsyncStorage.multiRemove(settingsKeys);
  }

  /**
   * Clear all temporary items
   */
  static async clearTemporaryItems() {
    const allKeys = await AsyncStorage.getAllKeys();
    const notSettingsKeys = allKeys.filter(x =>
      x.startsWith(this.tempStorageKeyPrefix),
    );
    await AsyncStorage.multiRemove(notSettingsKeys);
  }

  /**
   * Clears all personal identififieble data (GDPR)
   * @param user
   * @returns
   */
  static async clearPersonalData(user: User): Promise<void> {
    if (!user.personalNumber) {
      return;
    }

    const allKeys = await AsyncStorage.getAllKeys();
    const personalDataKeys = allKeys.filter(x =>
      x.startsWith(user.personalNumber ?? ''),
    );
    await AsyncStorage.multiRemove(personalDataKeys);
  }

  /**
   * Clears all async storage for this app and all libs that it uses
   */
  static async nukeAllStorage() {
    await AsyncStorage.clear();
  }
}
