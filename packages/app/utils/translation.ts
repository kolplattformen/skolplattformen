import { I18nManager } from 'react-native'
import { findBestAvailableLanguage } from 'react-native-localize'
import i18n from 'i18n-js'

type AvailableLanguages = 'sv' | 'en'

const translations = {
  en: () => require('../translations/en.json'),
  sv: () => require('../translations/sv.json'),
}

export const changeLanguage = (lang: AvailableLanguages) => {
  i18n.locale = lang
}

export const setI18nConfig = () => {
  const fallback = { languageTag: 'sv', isRTL: false }

  const { languageTag, isRTL } =
    findBestAvailableLanguage(Object.keys(translations)) || fallback

  I18nManager.forceRTL(isRTL)

  // @ts-expect-error Fix later
  i18n.translations = { [languageTag]: translations[languageTag]() }

  i18n.locale = languageTag
}

export const translate = (key: string, options?: Record<string, any>) => {
  return i18n.t(key, options)
}
