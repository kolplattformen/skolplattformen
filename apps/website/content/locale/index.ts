import sv from './sv'
import en from './en'

type LanguageKeys = keyof typeof en
export type Languages = 'sv' | 'en'
type Language = Record<LanguageKeys, string>

export default { en, sv } as Record<Languages, Language>
