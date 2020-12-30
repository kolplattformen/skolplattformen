import React from 'react'
import { StatusBar} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login } from './login.component'
import { Children } from './children.component'
import { Child } from './child.component'
import { NewsItem } from './newsItem.component'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='Login' component={Login} />
    <Screen name='Children' component={Children} />
    <Screen name='Child' component={Child} />
    <Screen name='NewsItem' component={NewsItem} />
  </Navigator>
)

export const AppNavigator = () => {
  return <NavigationContainer>
    <StatusBar />

    <HomeNavigator/>
  </NavigationContainer>
}
