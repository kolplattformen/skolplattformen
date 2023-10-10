import {Linking, Platform} from 'react-native';

const phoneNumber = '+46730121740';

export const useSMS = () => {
  const sendSMS = async (message: string) => {
    const separator = Platform.OS === 'ios' ? '&' : '?';
    const url = `sms:${phoneNumber}${separator}body=${message}`;
    await Linking.openURL(url);
  };

  return {sendSMS};
};
