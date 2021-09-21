import merge from 'deepmerge'

type Repo = Record<string, string>
export interface Translation {
  subjects: Repo
  traningsskolaSubjects: Repo
  languages: Repo
  categories: Repo
  misc: Repo
}
interface RawTranslation extends Translation {
  specialLanguages: Repo
}

const translations: Translations = {
  sv: require('./sv.json'),
  de: require('./de.json'),
  en: require('./en.json'),
  es: require('./es.json'),
  fr: require('./fr.json'),
  it: require('./it.json'),
  la: require('./la.json'),
  nb_NO: require('./nb_NO.json'),
  pl: require('./pl.json'),
}
const languageList: string[] = Object.keys(translations)
export type Language = typeof languageList[number]
type Translations = Record<Language, RawTranslation>

const translate = (lang: Language): Translation => {
  const selectedLanguage = languageList.includes(lang) ? lang : languageList[0]
  const {
    subjects,
    traningsskolaSubjects,
    specialLanguages,
    languages,
    categories,
    misc,
  } = merge(translations.sv,  translations[selectedLanguage])

  return {
    subjects,
    traningsskolaSubjects,
    categories,
    misc,
    languages: {
      ...specialLanguages,
      ...languages,
    },
  }
}

export default translate
