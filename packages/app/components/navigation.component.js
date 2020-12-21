import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import useAsyncStorage from '@rnhooks/async-storage'
import { Login } from './login.component'
import { Children } from './children.component'
import { Child } from './child.component'
import { NewsItem } from './newsItem.component'
import { Provider } from 'use-http'

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
  const [jwt, setJwt, clearJwt] = useAsyncStorage('@jwt')
  const options = {
    interceptors: {
      request: async ({ options, url, path, route }) => {
        console.log('requesting', url, path, route, options)
        return options
      }
    },
    headers: {
      Accept: 'application/json',
      authorization: 'Bearer ' + jwt,
    }
  }
  return <NavigationContainer>
    <Provider url='https://api.skolplattformen.org' options={options}>
      <HomeNavigator/>
    </Provider>
  </NavigationContainer>
}
