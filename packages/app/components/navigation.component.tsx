import { useApi } from '@skolplattformen/api-hooks'
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { schema } from '../app.json'
import Absence from './absence.component'
import { Child } from './child.component'
import { Children } from './children.component'
import { Auth } from './auth.component'
import { SetLanguage } from './setLanguage.component'
import { NewsItem } from './newsItem.component'
import {
  Child as ChildType,
  NewsItem as NewsItemType,
} from '@skolplattformen/embedded-api'
import { useAppState } from '../hooks/useAppState'

export type RootStackParamList = {
  Login: undefined
  Children: undefined
  Child: {
    child: ChildType
    color: string
    initialRouteName?: string
  }
  NewsItem: { newsItem: NewsItemType; child: ChildType }
  Absence: { child: ChildType }
  SetLanguage: undefined
}

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
  const { isLoggedIn, api } = useApi()

  const currentAppState = useAppState()

  useEffect(() => {
    const checkUser = async () => {
      if (currentAppState === 'active' && isLoggedIn) {
        const { isAuthenticated } = await api.getUser()

        if (!isAuthenticated) {
          api.logout()
        }
      }
    }
    checkUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAppState, isLoggedIn])

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
          <>
            <Screen name="Login" component={Auth} />
            <Screen name="SetLanguage" component={SetLanguage} />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  )
}
