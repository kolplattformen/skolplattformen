import { I18nManager } from 'react-native'
//import { findBestAvailableLanguage } from 'react-native-localize'
import i18n from 'i18n-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import 'moment/locale/sv'

export type AvailableLanguages = 'sv' | 'en'

const translations = {
  en: () => require('../translations/en.json'),
  sv: () => require('../translations/sv.json'),
}

export const changeLanguage = (lang: AvailableLanguages) => {
  AsyncStorage.setItem('selectedLocale', lang)
  setI18nConfig(lang)
}

export const getCurrentLanguage = async () => {
  const savedLocale = (await AsyncStorage.getItem(
    'selectedLocale'
  )) as AvailableLanguages

  if (savedLocale) {
    return savedLocale as AvailableLanguages
  } else {
    currentLocale() as AvailableLanguages
  }
}

export const setI18nConfig = (lang: AvailableLanguages = 'sv') => {
  // TODO: Fix this
  I18nManager.forceRTL(false)
  i18n.translations = { [lang]: translations[lang]() }
  i18n.locale = lang
  moment.locale(lang)
}

export const currentLocale = () => {
  return i18n.locale
}

export const translate = (key: string, options?: Record<string, any>) => {
  return i18n.t(key, options)
}
