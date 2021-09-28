import { useEffect, useState } from 'react'
import { LanguageService } from '../services/languageService'

export const useLangCode = () => {
  const [langCode, setLangCode] = useState(LanguageService.getLanguageCode())

  useEffect(() => {
    LanguageService.onChange({ key: 'useLanguage' }, (lang) => {
      setLangCode(lang)
    })
  }, [])

  return langCode
}
