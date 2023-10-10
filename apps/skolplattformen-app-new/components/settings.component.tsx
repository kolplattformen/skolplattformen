import {NavigationProp, useNavigation} from '@react-navigation/core';
import {useApi, useUser} from '../libs/hooks/src';
import React, {useCallback} from 'react';
import {ScrollView, Text} from 'react-native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import useSettingsStorage from '../hooks/useSettingsStorage';
import AppStorage from '../services/appStorage';
import {LanguageService} from '../services/languageService';
import {Layout as LayoutStyle, Sizing} from '../styles';
import {languages, translate} from '../utils/translation';
import {AwardIcon, BrushIcon, GlobeIcon} from './icon.component';
import {RootStackParamList} from './navigation.component';
import {
  SettingGroup,
  SettingListItem,
  SettingListSeparator,
} from './settingsComponents.component';
import {VersionInfo} from './versionInfo.component';

export const settingsRouteOptions = (): NativeStackNavigationOptions => ({
  title: translate('settings.settings'),
});

export const SettingsScreen = () => {
  const [isUsingSystemTheme] = useSettingsStorage('usingSystemTheme');
  const [settingsTheme] = useSettingsStorage('theme');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const langCode = LanguageService.getLanguageCode();
  const language = languages.find(l => l.langCode === langCode);
  const {api} = useApi();
  const {data: user} = useUser();

  const logout = useCallback(async () => {
    await AppStorage.clearTemporaryItems();
    await AppStorage.clearPersonalData(user);
    await api.logout();
    navigation.reset({
      routes: [{name: 'Login'}],
    });
  }, [api, navigation, user]);

  return (
    <ScrollView
      style={LayoutStyle.flex.full}
      contentContainerStyle={{
        padding: Sizing.t4,
      }}>
      <Text>Settings</Text>
      <SettingGroup>
        <SettingListItem
          label={translate('settings.appearance')}
          value={
            isUsingSystemTheme
              ? translate('settings.themeAuto')
              : translate(`themes.${settingsTheme}`)
          }
          icon={BrushIcon}
          onNavigate={() => navigation.navigate('SettingsAppearance')}
        />
        <SettingListSeparator />
        <SettingListItem
          label={translate('settings.language')}
          value={language?.languageLocalName}
          icon={GlobeIcon}
          onNavigate={() => navigation.navigate('SetLanguage')}
        />
      </SettingGroup>
      <SettingGroup>
        <SettingListItem
          label={translate('settings.licenses')}
          icon={AwardIcon}
          onNavigate={() => navigation.navigate('SettingsLicenses')}
        />
      </SettingGroup>

      {api.isLoggedIn && (
        <SettingGroup>
          <SettingListItem
            label={translate('general.logout')}
            onPress={logout}
          />
        </SettingGroup>
      )}

      <VersionInfo />
    </ScrollView>
  );
};
