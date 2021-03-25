import { useApi } from '@skolplattformen/api-hooks'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StatusBar } from 'react-native'
import { schema } from '../app.json'
import Absence from './absence.component'
import { Child } from './child.component'
import { Children } from './children.component'
import { Auth } from './auth.component'
import { NewsItem } from './newsItem.component'

const { Navigator, Screen } = createStackNavigator()

const linking = {
  prefixes: [schema],
  config: {
    screens: {
      Login: 'login',
    },
  },
}
export const AppNavigator = () => {
  const { isLoggedIn } = useApi()

  return (
    <NavigationContainer linking={linking}>
      <StatusBar />
      <Navigator headerMode="none">
        {isLoggedIn ? (
          <>
            <Screen name="Children" component={Children} />
            <Screen name="Child" component={Child} />
            <Screen name="NewsItem" component={NewsItem} />
            <Screen name="Absence" component={Absence} />
          </>
        ) : (
          <Screen name="Login" component={Auth} />
        )}
      </Navigator>
    </NavigationContainer>
  )
}
