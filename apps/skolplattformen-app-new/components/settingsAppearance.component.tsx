import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {ScrollView, StyleSheet, Switch} from 'react-native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import useSettingsStorage from '../hooks/useSettingsStorage';
import {Layout as LayoutStyle, Sizing} from '../styles';
import {translate} from '../utils/translation';
import {RootStackParamList} from './navigation.component';
import {
  SettingGroup,
  SettingListItem,
  SettingListSeparator,
} from './settingsComponents.component';

export const settingsAppearanceRouteOptions =
  (): NativeStackNavigationOptions => ({
    title: translate('settings.appearance'),
  });

export const SettingsAppearanceScreen = () => {
  const [isUsingSystemTheme, setUsingSystemTheme] =
    useSettingsStorage('usingSystemTheme');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [settingsTheme] = useSettingsStorage('theme');

  return (
    <ScrollView
      style={LayoutStyle.flex.full}
      contentContainerStyle={styles.container}>
      <SettingGroup>
        <SettingListItem label={translate('settings.useSystemTheme')}>
          <Switch
            value={isUsingSystemTheme}
            onValueChange={setUsingSystemTheme}
          />
        </SettingListItem>
        {!isUsingSystemTheme && (
          <>
            <SettingListSeparator />
            <SettingListItem
              label={translate('settings.theme')}
              value={translate(`themes.${settingsTheme}`)}
              onNavigate={() => navigation.navigate('SettingsAppearanceTheme')}
            />
          </>
        )}
      </SettingGroup>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Sizing.t4,
  },
});
