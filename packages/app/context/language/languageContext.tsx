import React, { useState, useEffect, ReactNode } from 'react'
import * as RNLocalize from 'react-native-localize'

import { LanguageService } from '../../services/languageService'
import { LanguageStorage } from '../../services/languageStorage'
import { translations } from '../../utils/translation'

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
}) => {
  LanguageService.setAllData({ data })

  const [Strings, setStrings] = useState(() => {
    if (initialLanguageCode && data[initialLanguageCode]) {
      LanguageService.setLanguageCode({ langCode: initialLanguageCode })
      LanguageService.seti18nConfig({ langCode: initialLanguageCode })

      return data[initialLanguageCode]
    }

    const fallBack = { languageTag: 'sv' }

    const { languageTag } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translations)) ||
      fallBack
    const bestStrings = data[languageTag]

    LanguageService.setLanguageCode({ langCode: languageTag })
    LanguageService.seti18nConfig({ langCode: languageTag })

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
        LanguageService.setLanguageCode({
          langCode: languageCode || initialLanguageCode,
        })
        LanguageService.seti18nConfig({
          langCode: languageCode || initialLanguageCode,
        })
      }
    }
    checkLanguageLocal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LanguageContext.Provider value={{ Strings }}>
      {children}
    </LanguageContext.Provider>
  )
}
