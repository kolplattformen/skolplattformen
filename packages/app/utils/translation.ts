import i18n from 'i18n-js'

export const translations = {
  en: require('../translations/en.json'),
  sv: require('../translations/sv.json'),
}

export const translate = (key: string, options?: Record<string, any>) => {
  return i18n.t(key, options)
}
