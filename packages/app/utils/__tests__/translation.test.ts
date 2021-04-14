import { I18nManager } from 'react-native'
import { setI18nConfig } from '../translation'

describe('translation', () => {
  it('rtl should be default left', () => {
    setI18nConfig()
    expect(I18nManager.isRTL).toEqual(false)
  })
  it.skip('rtl should be set to right', () => {
    setI18nConfig()
    expect(I18nManager.isRTL).toEqual(true)
  })
  it.skip('should set the correct language config', () => {})

  it.skip('should fallback to swedish', () => {})
  it.skip('should be able to translate', () => {})
})
