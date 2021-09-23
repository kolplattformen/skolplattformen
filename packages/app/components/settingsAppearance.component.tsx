import React from 'react'
import { ScrollView, Switch } from 'react-native'
import { NativeStackNavigationOptions } from 'react-native-screens/native-stack'
import { Layout as LayoutStyle, Sizing } from '../styles'
import { translate } from '../utils/translation'
import {
  SettingGroup,
  SettingListItemText,
} from './settingsComponents.component'

export const settingsAppearanceRouteOptions =
  (): NativeStackNavigationOptions => ({
    title: translate('settings.appearance'),
  })

export const SettingsAppearanceScreen = () => {
  return (
    <ScrollView
      style={LayoutStyle.flex.full}
      contentContainerStyle={{
        padding: Sizing.t4,
      }}
    >
      <SettingGroup>
        <SettingListItemText label="Use System Light/Dark Theme">
          <Switch />
        </SettingListItemText>
      </SettingGroup>
    </ScrollView>
  )
}
