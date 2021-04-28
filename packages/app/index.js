/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { setupi18n } from './utils/translation'

setupi18n()

AppRegistry.registerComponent(appName, () => App)
