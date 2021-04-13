import memoize from 'fast-memoize'
import i18n from 'i18n-js'
import { I18nManager } from 'react-native'
import * as RNLocalize from 'react-native-localize'

const translationGetters = {
  en: () => require('../translations/en.json'),
  sv: () => require('../translations/sv.json'),
}

export const setI18nConfig = () => {
  const fallback = { languageTag: 'sv', isRTL: false }

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback

  I18nManager.forceRTL(isRTL)

  // @ts-expect-error Fix later
  i18n.translations = { [languageTag]: translationGetters[languageTag]() }
  i18n.locale = languageTag
}

export const translate = memoize(i18n.t)
