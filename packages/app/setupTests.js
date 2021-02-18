import 'react-native-gesture-handler/jestSetup'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

// Silence useNativeDriver error
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
