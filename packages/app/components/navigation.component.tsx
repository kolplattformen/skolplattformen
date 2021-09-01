import { NavigationContainer } from '@react-navigation/native'
import { useApi } from '@skolplattformen/api-hooks'
import {
  Child as ChildType,
  NewsItem as NewsItemType,
} from '@skolplattformen/embedded-api'
import { useTheme } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { schema } from '../app.json'
import {
  darkNavigationTheme,
  lightNavigationTheme,
} from '../design/navigationThemes'
import { useAppState } from '../hooks/useAppState'
import Absence, { absenceRouteOptions } from './absence.component'
import { Auth, authRouteOptions } from './auth.component'
import { Child, childRouteOptions } from './child.component'
import { childenRouteOptions, Children } from './children.component'
import { NewsItem, newsItemRouteOptions } from './newsItem.component'
import { SetLanguage, setLanguageRouteOptions } from './setLanguage.component'

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

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

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

  const colorScheme = useColorScheme()
  const colors = useTheme()

  const currentAppState = useAppState()

  useEffect(() => {
    const checkUser = async () => {
      if (currentAppState === 'active' && isLoggedIn) {
        const { isAuthenticated } = await api.getUser()

        if (!isAuthenticated) {
          await api.logout()
        }
      }
    }
    checkUser()
  }, [currentAppState, isLoggedIn, api])

  return (
    <NavigationContainer
      linking={linking}
      theme={
        colorScheme === 'dark' ? darkNavigationTheme : lightNavigationTheme
      }
    >
      <StatusBar />
      <Navigator
        screenOptions={() => ({
          headerLargeTitle: false,
          headerLargeTitleHideShadow: true,
          headerStyle: {
            backgroundColor: colors['background-basic-color-2'],
          },
          headerLargeTitleStyle: {
            fontFamily: 'Poppins-ExtraBold',
          },
        })}
      >
        {isLoggedIn ? (
          <>
            <Screen
              name="Children"
              component={Children}
              options={childenRouteOptions}
            />
            <Screen
              name="Child"
              component={Child}
              options={childRouteOptions}
            />
            <Screen
              name="NewsItem"
              component={NewsItem}
              options={newsItemRouteOptions}
            />
            <Screen
              name="Absence"
              component={Absence}
              options={absenceRouteOptions}
            />
          </>
        ) : (
          <>
            <Screen name="Login" component={Auth} options={authRouteOptions} />
            <Screen
              name="SetLanguage"
              component={SetLanguage}
              options={setLanguageRouteOptions}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  )
}
