import i18n, {TranslateOptions} from 'i18n-js';

// const i18n = new I18n();

interface Language {
  langCode: string;
  languageName: string;
  languageLocalName: string;
  locale: string;
  active: boolean;
}

export const languages: Language[] = [
  {
    langCode: 'sv',
    languageName: 'Swedish',
    languageLocalName: 'Svenska',
    locale: 'sv',
    active: true,
  },
  {
    langCode: 'ar',
    languageName: 'Arabic',
    languageLocalName: 'اَلْعَرَبِيَّةُ',
    locale: 'ar',
    active: true,
  },
  {
    langCode: 'zh_Hant',
    languageName: 'Chinese (traditional)',
    languageLocalName: '繁體中文',
    locale: 'zh-cn',
    active: true,
  },
  {
    langCode: 'zh_Hans',
    languageName: 'Chinese (simplified)',
    languageLocalName: '简体中文',
    locale: 'zh-cn',
    active: true,
  },
  {
    langCode: 'nl',
    languageName: 'Dutch',
    languageLocalName: 'Nederlands',
    locale: 'nl',
    active: true,
  },
  {
    langCode: 'en',
    languageName: 'English',
    languageLocalName: 'English',
    locale: 'en',
    active: true,
  },

  {
    langCode: 'de',
    languageName: 'German',
    languageLocalName: 'Deutsch',
    locale: 'de',
    active: true,
  },

  {
    langCode: 'fi',
    languageName: 'Finnish',
    languageLocalName: 'Suomi',
    locale: 'fi',
    active: true,
  },
  {
    langCode: 'fr',
    languageName: 'French',
    languageLocalName: 'Français',
    locale: 'fr',
    active: true,
  },
  {
    langCode: 'it',
    languageName: 'Italian',
    languageLocalName: 'Italiano',
    locale: 'it',
    active: true,
  },
  {
    langCode: 'ja',
    languageName: 'Japanese',
    languageLocalName: '日本語',
    locale: 'ja',
    active: true,
  },
  {
    langCode: 'la',
    languageName: 'Latin',
    languageLocalName: 'Latina',
    locale: 'sv',
    active: true,
  },
  {
    langCode: 'nb_NO',
    languageName: 'Norwegian Bokmål',
    languageLocalName: 'Norsk bokmål',
    locale: 'nb',
    active: true,
  },
  {
    langCode: 'pl',
    languageName: 'Polish',
    languageLocalName: 'Polski',
    locale: 'pl',
    active: true,
  },
  {
    langCode: 'pt',
    languageName: 'Portuguese',
    languageLocalName: 'Português',
    locale: 'pt',
    active: true,
  },
  {
    langCode: 'ru',
    languageName: 'Russian',
    languageLocalName: 'русский',
    locale: 'ru',
    active: false,
  },
  {
    langCode: 'so',
    languageName: 'Somali',
    languageLocalName: 'af-Soomaali',
    locale: 'sv',
    active: true,
  },
  {
    langCode: 'es',
    languageName: 'Spanish',
    languageLocalName: 'Español',
    locale: 'es',
    active: true,
  },
  {
    langCode: 'th',
    languageName: 'Thai',
    languageLocalName: 'ไทย',
    locale: 'th',
    active: true,
  },
  {
    langCode: 'uk',
    languageName: 'Ukrainian',
    languageLocalName: 'український',
    locale: 'uk',
    active: true,
  },
];

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
  pt: require('../translations/pt.json'),
  ru: require('../translations/ru.json'),
  so: require('../translations/so.json'),
  sv: require('../translations/sv.json'),
  th: require('../translations/th.json'),
  uk: require('../translations/uk.json'),
  zh_Hans: require('../translations/zh_Hans.json'),
  zh_Hant: require('../translations/zh_Hant.json'),
};

export const translate = (key: string, options?: TranslateOptions) => {
  return i18n.t(key, options);
};
