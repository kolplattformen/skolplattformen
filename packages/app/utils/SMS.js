import { Linking, Platform } from 'react-native'

const phoneNumber = '+46701234567'

export const useSMS = () => {
  const sendSMS = async (message) => {
    const separator = Platform.OS === 'ios' ? '&' : '?'
    const url = `sms:${phoneNumber}${separator}body=${message}`
    await Linking.openURL(url)
  }

  return { sendSMS }
}
