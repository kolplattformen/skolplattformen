import i18n from 'i18n-js'
import { I18nManager } from 'react-native'
import { findBestAvailableLanguage } from 'react-native-localize'

const translations = {
  en: () => require('../translations/en.json'),
  sv: () => require('../translations/sv.json'),
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

export const translate = i18n.t
