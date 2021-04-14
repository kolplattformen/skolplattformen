import { useEffect, useState } from 'react'
import {
  AvailableLanguages,
  currentLocale,
  setI18nConfig,
} from '../utils/translation'

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<AvailableLanguages>(
    currentLocale() as AvailableLanguages
  )
  useEffect(() => {
    setI18nConfig(currentLanguage)
  }, [currentLanguage])

  return {
    currentLanguage,
    setCurrentLanguage,
  }
}
