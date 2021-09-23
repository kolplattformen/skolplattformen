import { NavigationProp, useNavigation } from '@react-navigation/core'
import { useApi } from '@skolplattformen/api-hooks'
import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { NativeStackNavigationOptions } from 'react-native-screens/native-stack'
import AppStorage from '../services/appStorage'
import { LanguageService } from '../services/languageService'
import { Layout as LayoutStyle, Sizing } from '../styles'
import { languages, translate } from '../utils/translation'
import { AwardIcon, BrushIcon, GlobeIcon } from './icon.component'
import { RootStackParamList } from './navigation.component'
import {
  SettingGroup,
  SettingListItemText,
  SettingListSeparator,
} from './settingsComponents.component'
import { VersionInfo } from './versionInfo.component'

export const settingsRouteOptions = (): NativeStackNavigationOptions => ({
  title: translate('settings.settings'),
})

export const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const langCode = LanguageService.getLanguageCode()
  const language = languages.find((l) => l.langCode === langCode)
  const { api } = useApi()

  const logout = useCallback(async () => {
    await AppStorage.clearTemporaryItems()
    await api.logout()
    navigation.reset({
      routes: [{ name: 'Login' }],
    })
  }, [api, navigation])

  return (
    <ScrollView
      style={LayoutStyle.flex.full}
      contentContainerStyle={{
        padding: Sizing.t4,
      }}
    >
      <SettingGroup>
        <SettingListItemText
          label={translate('settings.appearance')}
          value="Auto"
          icon={BrushIcon}
          onNavigate={() => navigation.navigate('SettingsAppearance')}
        />
        <SettingListSeparator />
        <SettingListItemText
          label={translate('settings.language')}
          value={language?.languageLocalName}
          icon={GlobeIcon}
          onNavigate={() => navigation.navigate('SetLanguage')}
        />
      </SettingGroup>
      <SettingGroup>
        <SettingListItemText
          label={translate('settings.licenses')}
          icon={AwardIcon}
          onNavigate={() => navigation.navigate('SettingsLicenses')}
        />
      </SettingGroup>
      {api.isLoggedIn && (
        <SettingGroup>
          <SettingListItemText
            label={translate('general.logout')}
            onPress={logout}
          />
        </SettingGroup>
      )}

      <VersionInfo />
    </ScrollView>
  )
}
