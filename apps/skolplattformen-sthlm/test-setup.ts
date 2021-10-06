import '@testing-library/jest-native/extend-expect'
import moment from 'moment'
import 'moment/locale/sv'
import 'react-native-gesture-handler/jestSetup'

moment.locale('sv')

// Silence useNativeDriver error
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {
    // noop
  }

  return Reanimated
})
