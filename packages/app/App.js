import React from 'react'
import { StyleSheet } from 'react-native'
import {
  ApplicationProvider,
  IconRegistry
} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import customization from './design/customization.json'
import { AppNavigator } from './components/navigation.component'
 
export default () => {
  
  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={{...eva.light, ...customization}}>
        <AppNavigator />
      </ApplicationProvider>
    </>
  )
}