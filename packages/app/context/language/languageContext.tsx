import React, { useState, useEffect, ReactNode } from 'react'
import * as RNLocalize from 'react-native-localize'
import { LoadingComponent } from '../../components/loading.component'

import { LanguageService } from '../../services/languageService'
import { LanguageStorage } from '../../services/languageStorage'
import { translations } from '../../utils/translation'

export const LanguageContext = React.createContext({
  Strings: {},
  languageCode: '',
})

interface Props {
  children: ReactNode
  data: any
  initialLanguageCode: string
  cache: any
}

export const LanguageProvider: React.FC<Props> = ({
  children,
  data,
  initialLanguageCode,
  cache,
}) => {
  LanguageService.setAllData({ data })

  const [languageCode, setLanguageCode] = useState<string>('')

  const [Strings, setStrings] = useState(() => {
    if (initialLanguageCode && data[initialLanguageCode]) {
      LanguageService.setLanguageCode({ langCode: initialLanguageCode })
      LanguageService.seti18nConfig({ langCode: initialLanguageCode })
      setLanguageCode(initialLanguageCode)

      return data[initialLanguageCode]
    }

    const fallBack = { languageTag: 'sv' }

    const { languageTag } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translations)) ||
      fallBack

    const bestStrings = data[languageTag]

    return bestStrings
  })

  useEffect(() => {
    LanguageService.onChange(
      { key: 'LanguageProvider' },
      (langCode: string) => {
        if (langCode && data[langCode]) {
          setLanguageCode(langCode)
          setStrings(data[langCode])
          if (cache) {
            LanguageStorage.save(langCode)
          }
        }
      }
    )

    const checkLanguageLocal = async () => {
      if (cache) {
        const lang = (await LanguageStorage.get()) || initialLanguageCode
        LanguageService.setLanguageCode({
          langCode: lang,
        })
        LanguageService.seti18nConfig({
          langCode: lang,
        })
        setLanguageCode(lang)
      }
    }
    checkLanguageLocal()
  }, [cache, data, initialLanguageCode, languageCode])

  return (
    <LanguageContext.Provider value={{ Strings, languageCode: languageCode }}>
      {languageCode ? children : <LoadingComponent />}
    </LanguageContext.Provider>
  )
}
