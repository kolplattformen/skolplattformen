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

export type Language = 'sv' | 'en'
type Translations = Record<Language, RawTranslation>

const translations: Translations = {
  sv: require('./sv.json'),
  en: require('./en.json'),
}

const translate = (lang: Language): Translation => {
  const {
    subjects,
    traningsskolaSubjects,
    specialLanguages,
    languages,
    categories,
    misc,
  } = translations[lang]

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
