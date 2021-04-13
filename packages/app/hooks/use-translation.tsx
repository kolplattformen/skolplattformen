import { useEffect } from 'react'
import { setI18nConfig } from '../utils/translation'
import useForceUpdate from './use-force-update'
import * as RNLocalize from 'react-native-localize'

export const useTranslation = () => {
  const forceUpdate = useForceUpdate()

  const handleLocalizationChange = () => {
    setI18nConfig()
    forceUpdate()
  }

  useEffect(() => {
    setI18nConfig()

    return RNLocalize.addEventListener('change', handleLocalizationChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
