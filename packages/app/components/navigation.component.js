import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StatusBar } from 'react-native'
import { Child } from './child.component'
import { Children } from './children.component'
import { Login } from './login.component'
import { NewsItem } from './newsItem.component'
import Absence from './absence.component'
import { schema } from '../app.json'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Login" component={Login} />
    <Screen name="Children" component={Children} />
    <Screen name="Child" component={Child} />
    <Screen name="NewsItem" component={NewsItem} />
    <Screen name="Absence" component={Absence} />
  </Navigator>
)

const linking = {
  prefixes: [schema],
  config: {
    screens: {
      Login: 'login',
    },
  },
}
export const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <StatusBar />
      <HomeNavigator />
    </NavigationContainer>
  )
}
