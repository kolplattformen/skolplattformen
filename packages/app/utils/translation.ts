import i18n, { TranslateOptions } from 'i18n-js'

interface Language {
  langCode: string
  languageName: string
  languageLocalName: string
  active: boolean
}

export const languages: Language[] = [
  {
    langCode: 'sv',
    languageName: 'Swedish',
    languageLocalName: 'Svenska',
    active: true,
  },
  {
    langCode: 'en',
    languageName: 'English',
    languageLocalName: 'English',
    active: true,
  },
  {
    langCode: 'pl',
    languageName: 'Polish',
    languageLocalName: 'Polski',
    active: true,
  },
  {
    langCode: 'de',
    languageName: 'German',
    languageLocalName: 'Deutsch',
    active: true,
  },
  {
    langCode: 'ar',
    languageName: 'Arabic',
    languageLocalName: 'اَلْعَرَبِيَّةُ',
    active: false,
  },
  {
    langCode: 'so',
    languageName: 'Somali',
    languageLocalName: 'af-Soomaali',
    active: false,
  },
]

export const translations = {
  ar: require('../translations/ar.json'),
  de: require('../translations/de.json'),
  en: require('../translations/en.json'),
  pl: require('../translations/pl.json'),
  so: require('../translations/so.json'),
  sv: require('../translations/sv.json'),
}

export const translate = (key: string, options?: TranslateOptions) => {
  return i18n.t(key, options)
}
