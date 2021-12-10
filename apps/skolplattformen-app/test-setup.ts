import '@testing-library/jest-native/extend-expect'
import moment from 'moment'
import 'moment/locale/sv'
import 'react-native-gesture-handler/jestSetup'

moment.locale('sv')

// Mock hooks
jest.mock('@skolplattformen/hooks')

// Silence useNativeDriver error
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('@react-navigation/native')
jest.mock('@react-navigation/core')
jest.mock('react-native-localize')
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve('mockResolve')),
}))
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native')

  RN.UIManager.measureInWindow = (_node, callback) => {
    callback(0, 0, 42, 42)
  }

  return RN
})

jest.mock('react-native-simple-toast', () => ({
  SHORT: 'short',
  BOTTOM: 'bottom',
  showWithGravity: jest.fn(),
}))

jest.mock('react-native-calendar-events', () => ({
  saveEvent: jest.fn().mockResolvedValue('52'),
  requestPermissions: jest.fn().mockResolvedValue('authorized'),
}))
