import React, { useState, useEffect, ReactNode } from 'react'
import * as RNLocalize from 'react-native-localize'

import { LanguageService } from '../../services/languageService'
import { LanguageStorage } from '../../services/languageStorage'

export const LanguageContext = React.createContext({ Strings: {} })

interface Props {
  children: ReactNode
  data: any
  initialLanguageCode: string
  cache: any
  initalHasCheckedLanguage: boolean
}

export const LanguageProvider: React.FC<Props> = ({
  children,
  data,
  initialLanguageCode,
  cache,
  initalHasCheckedLanguage,
}) => {
  LanguageService.setAllData({ data })

  const [hasCheckedLanguage, setHasCheckedLanguage] = useState(
    initalHasCheckedLanguage
  )

  const [Strings, setStrings] = useState(() => {
    if (initialLanguageCode && data[initialLanguageCode]) {
      LanguageService.setLanguageCode({ langCode: initialLanguageCode })
      LanguageService.seti18nConfig({ langCode: initialLanguageCode })
      setHasCheckedLanguage(true)

      return data[initialLanguageCode]
    }

    let languageCode
    let bestStrings
    const localizes = RNLocalize.getLocales()
    for (let i = 0; i < localizes.length; i++) {
      const element = localizes[i]
      if (data[element.languageCode]) {
        bestStrings = data[element.languageCode]
        languageCode = element.languageCode
        break
      }
    }

    LanguageService.setLanguageCode({ langCode: languageCode })
    return bestStrings
  })
  useEffect(() => {
    LanguageService.onChange(
      { key: 'LanguageProvider' },
      (langCode: string) => {
        if (langCode && data[langCode]) {
          setStrings(data[langCode])
          if (cache) {
            LanguageStorage.save(langCode)
          }
        }
      }
    )

    const checkLanguageLocal = async () => {
      if (cache) {
        const languageCode = await LanguageStorage.get()
        if (languageCode) {
          LanguageService.setLanguageCode({ langCode: languageCode })
          LanguageService.seti18nConfig({ langCode: languageCode })
          setHasCheckedLanguage(true)
        }
      }
    }
    checkLanguageLocal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LanguageContext.Provider value={{ Strings }}>
      {hasCheckedLanguage && children}
    </LanguageContext.Provider>
  )
}
