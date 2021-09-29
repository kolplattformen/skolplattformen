import i18n from 'i18n-js'
import { useMemo } from 'react'
import { useLangCode } from './useLangCode'

export const useTranslation = () => {
  const langCode = useLangCode()
  const output = useMemo(() => {
    return { t: i18n.t, langCode }
  }, [langCode])
  return output
}
