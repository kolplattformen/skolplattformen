import 'react-native-gesture-handler/jestSetup'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import moment from 'moment'
import 'moment/locale/sv'

moment.locale('sv')

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

// Silence useNativeDriver error
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
