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
  en: require('./en.json'),
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
  } = translations[selectedLanguage]

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
