import { I18nManager } from 'react-native'
import i18n from 'i18n-js'
import moment from 'moment'
import 'moment/locale/ar'
import 'moment/locale/de'
import 'moment/locale/pl'
import 'moment/locale/sv'

const changeListeners: Record<string, any> = {}

let allString: Record<string, any> = {}

let Strings: Record<string, any> = {}
let languageCode: string

const rtlList: { [key: string]: boolean } = {
  en: false,
  de: false,
  pl: false,
  sv: false,
  so: false,
  ar: true,
}

export const isRTL = (langCode: string) => {
  if (!rtlList.hasOwnProperty(langCode)) {
    return false
  }
  return rtlList[langCode]
}

export const LanguageService = {
  get: () => Strings,
  getLanguageCode: () => languageCode,
  setAllData: ({ data }: { data: Record<string, any> }) => {
    allString = data
  },
  seti18nConfig: ({ langCode }: { langCode?: string }) => {
    if (langCode) {
      i18n.translations = { [langCode]: Strings }
      i18n.locale = langCode
      i18n.fallbacks = true
      I18nManager.forceRTL(isRTL(langCode))
    }

    moment.locale(langCode)
  },
  setLanguageCode: ({ langCode }: { langCode?: string }) => {
    if (langCode && allString[langCode]) {
      languageCode = langCode
      Strings = allString[langCode]
    } else {
      const dataKeys = Object.keys(allString)
      languageCode = dataKeys[0]
      Strings = allString[languageCode]
    }
    Object.keys(changeListeners).forEach((k) => {
      changeListeners[k](langCode)
    })
    return Strings
  },

  // @ts-expect-error Fix later, Typecast callback
  onChange: ({ key }: { key: string }, cb) => {
    // @ts-expect-error Fix later, Typecast callback
    changeListeners[`${key}`] = (langCode) => cb(langCode)
  },
}
