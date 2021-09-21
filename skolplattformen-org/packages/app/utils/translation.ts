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
    langCode: 'ar',
    languageName: 'Arabic',
    languageLocalName: 'اَلْعَرَبِيَّةُ',
    active: true,
  },
  {
    langCode: 'nl',
    languageName: 'Dutch',
    languageLocalName: 'Nederlands',
    active: true,
  },
  {
    langCode: 'en',
    languageName: 'English',
    languageLocalName: 'English',
    active: true,
  },

  {
    langCode: 'de',
    languageName: 'German',
    languageLocalName: 'Deutsch',
    active: true,
  },

  {
    langCode: 'fi',
    languageName: 'Finnish',
    languageLocalName: 'Suomi',
    active: true,
  },
  {
    langCode: 'fr',
    languageName: 'French',
    languageLocalName: 'Français',
    active: true,
  },
  {
    langCode: 'it',
    languageName: 'Italian',
    languageLocalName: 'Italiano',
    active: true,
  },
  {
    langCode: 'ja',
    languageName: 'Japanese',
    languageLocalName: '日本語',
    active: false,
  },
  {
    langCode: 'la',
    languageName: 'Latin',
    languageLocalName: 'Latina',
    active: false,
  },
  {
    langCode: 'nb_NO',
    languageName: 'Norwegian Bokmål',
    languageLocalName: 'Norsk bokmål',
    active: false,
  },
  {
    langCode: 'pl',
    languageName: 'Polish',
    languageLocalName: 'Polski',
    active: true,
  },
  {
    langCode: 'ru',
    languageName: 'Russian',
    languageLocalName: 'русский',
    active: false,
  },
  {
    langCode: 'so',
    languageName: 'Somali',
    languageLocalName: 'af-Soomaali',
    active: false,
  },
  {
    langCode: 'es',
    languageName: 'Spanish',
    languageLocalName: 'Español',
    active: true,
  },
]

export const translations = {
  ar: require('../translations/ar.json'),
  de: require('../translations/de.json'),
  en: require('../translations/en.json'),
  es: require('../translations/es.json'),
  fi: require('../translations/fi.json'),
  fr: require('../translations/fr.json'),
  it: require('../translations/it.json'),
  ja: require('../translations/ja.json'),
  la: require('../translations/la.json'),
  nb_NO: require('../translations/nb_NO.json'),
  nl: require('../translations/nl.json'),
  pl: require('../translations/pl.json'),
  ru: require('../translations/ru.json'),
  so: require('../translations/so.json'),
  sv: require('../translations/sv.json'),
}

export const translate = (key: string, options?: TranslateOptions) => {
  return i18n.t(key, options)
}
