import { useEffect, useState } from 'react'
import {
  AvailableLanguages,
  setI18nConfig,
  getCurrentLanguage,
} from '../utils/translation'

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<AvailableLanguages>()

  useEffect(() => {
    async function setDefaultLanguage() {
      const defaultLanguage = await getCurrentLanguage()
      setCurrentLanguage(defaultLanguage)
    }
    setDefaultLanguage()
  }, [])

  useEffect(() => {
    setI18nConfig(currentLanguage)
  }, [currentLanguage])

  return {
    currentLanguage,
    setCurrentLanguage,
  }
}
