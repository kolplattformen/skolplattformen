import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ApplicationProvider,
  IconRegistry
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import customization from './design/customization.json';
import useAsyncStorage from '@rnhooks/async-storage'
import { Provider } from 'use-http'
import { AppNavigator } from './components/navigation.component';
 
export default () => {
  const [jwt, setJwt, clearJwt] = useAsyncStorage('@jwt')
  const options = {
    headers: {
      Accept: 'application/json',
      authorization: 'Bearer ' + jwt
    }
  }
  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={{...eva.light, ...customization}}>
        <Provider url='https://api.skolplattformen.org' options={options}>
          <AppNavigator />
        </Provider>
      </ApplicationProvider>
    </>
  )
}