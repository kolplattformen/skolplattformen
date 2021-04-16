import { I18nManager } from 'react-native'
import i18n from 'i18n-js'
import moment from 'moment'

const changeListeners: Record<string, any> = {}

let allString: Record<string, any> = {}

let Strings: Record<string, any> = {}
let languageCode: string

/*
const isRTL: { [key: string]: boolean } = {
  en: false,
  sv: false,
}*/

export const LanguageService = {
  get: () => Strings,
  getLanguageCode: () => languageCode,
  setAllData: ({ data }: { data: Record<string, any> }) => {
    allString = data
  },
  seti18nConfig: ({ langCode }: { langCode: string }) => {
    i18n.translations = { [langCode]: Strings }
    i18n.locale = langCode
    I18nManager.forceRTL(false)

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
    if (langCode) {
      i18n.translations = { [langCode]: Strings }
      i18n.locale = langCode
    }
    return Strings
  },

  // @ts-expect-error Fix later
  onChange: ({ key }: { key: string }, cb) => {
    // @ts-expect-error Fix later
    changeListeners[`${key}`] = (langCode) => cb(langCode)
  },
}
