import translate, { Language, Translation } from './translations'

export interface Subject {
  code: string
  category: string
  name: string
  comment?: string
}

type Parser = (translation: Translation, code: string) => Subject | null
const parseSubject: Parser = ({ subjects }, code) => {
  if (!subjects[code]) return null

  return {
    code,
    category: '',
    name: subjects[code] as string,
  }
}

const parseTrainingSubject: Parser = (
  { categories, traningsskolaSubjects },
  code
) => {
  if (!traningsskolaSubjects[code]) return null

  return {
    code,
    category: categories.trainingSchool,
    name: traningsskolaSubjects[code] as string,
  }
}

const parseLanguage: Parser = ({ categories, languages }, code) => {
  if (!code.startsWith('M1') && !code.startsWith('M2')) return null
  const category = `${categories.modernLanguages}, ${
    code.startsWith('M1')
      ? categories.modernLanguagesA1
      : categories.modernLanguagesA2
  }`
  const language = code.substr(2)

  return {
    code,
    category,
    name: languages[language] || categories.unknown,
  }
}

const parseAltLanguage: Parser = ({ categories, languages }, code) => {
  if (!code.startsWith('ASSV')) return null
  const language = code.substr(4)

  return {
    code,
    category: categories.modernLanguagesAlt,
    name: languages[language] || categories.unknown,
  }
}

const parseNativeLanguage: Parser = ({ categories, languages }, code) => {
  if (!code.startsWith('ML')) return null
  const language = code.substr(2)

  return {
    code,
    category: categories.motherTounge,
    name: languages[language] || categories.unknown,
  }
}

const parseMisc: Parser = ({ categories, misc }, code) => {
  if (!misc[code]) return null

  return {
    code,
    category: categories.misc,
    name: misc[code] as string,
  }
}

const parse = (code: string, lang: Language = 'sv'): Subject => {
  const translation = translate(lang)
  const [subjectCode, ...rest] = code.split(' ')
  const result: Subject = parseSubject(translation, subjectCode) ||
    parseTrainingSubject(translation, subjectCode) ||
    parseLanguage(translation, subjectCode) ||
    parseAltLanguage(translation, subjectCode) ||
    parseNativeLanguage(translation, subjectCode) ||
    parseMisc(translation, subjectCode) || {
      code: subjectCode,
      category: translation.categories.unknown,
      name: subjectCode,
    }
  if (rest.length) result.comment = rest.join(' ').trim()
  return result
}

export default parse
