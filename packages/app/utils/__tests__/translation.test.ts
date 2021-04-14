import { I18nManager } from 'react-native'
import { setI18nConfig } from '../translation'

describe('translation', () => {
  it('rtl should be default left', () => {
    setI18nConfig()
    expect(I18nManager.isRTL).toEqual(false)
  })
})
