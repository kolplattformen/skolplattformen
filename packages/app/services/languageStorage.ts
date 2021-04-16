import AsyncStorage from '@react-native-community/async-storage'

const AsyncStoreKey = { language: 'local-language-async' }

export const LanguageStorage = {
  save: async (languageCode: string) => {
    try {
      await AsyncStorage.setItem(AsyncStoreKey.language, languageCode)
    } catch (error) {}
  },
  remove: () => {
    AsyncStorage.removeItem(AsyncStoreKey.language)
  },
  get: async () => {
    try {
      const result = await AsyncStorage.getItem(AsyncStoreKey.language)
      return result
    } catch (error) {
      return null
    }
  },
}
