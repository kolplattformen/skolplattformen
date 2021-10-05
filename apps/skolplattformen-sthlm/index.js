/**
 * @format
 */
import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import App from './App'
import { name as appName } from './app.json'

console.log(AppRegistry)

AppRegistry.registerComponent(appName, () => App)
