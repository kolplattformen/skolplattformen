import i18n from 'i18n-js'

export const translations = {
  ar: require('../translations/ar.json'),
  de: require('../translations/de.json'),
  en: require('../translations/en.json'),
  pl: require('../translations/pl.json'),
  so: require('../translations/so.json'),
  sv: require('../translations/sv.json')
}

export const translate = (key: string, options?: Record<string, any>) => {
  return i18n.t(key, options)
}
