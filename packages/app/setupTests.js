import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import moment from 'moment'
import 'moment/locale/sv'
import 'react-native-gesture-handler/jestSetup'

moment.locale('sv')

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

// Silence useNativeDriver error
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {}

  return Reanimated
})
