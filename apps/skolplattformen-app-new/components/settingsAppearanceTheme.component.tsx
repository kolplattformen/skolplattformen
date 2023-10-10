import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import useSettingsStorage from '../hooks/useSettingsStorage';
import {Layout as LayoutStyle, Sizing} from '../styles';
import {translate} from '../utils/translation';
import {
  SettingGroup,
  SettingListItemSelectable,
} from './settingsComponents.component';

export const settingsAppearanceThemeRouteOptions =
  (): NativeStackNavigationOptions => ({
    title: translate('settings.theme'),
  });

const themes = ['light', 'dark'];

export const SettingsAppearanceThemeScreen = () => {
  const [settingsTheme, setSettingsTheme] = useSettingsStorage('theme');

  return (
    <ScrollView
      style={LayoutStyle.flex.full}
      contentContainerStyle={styles.container}>
      <SettingGroup>
        <View style={styles.themeList}>
          {themes.map(theme => {
            return (
              <SettingListItemSelectable
                key={theme}
                onPress={() => setSettingsTheme(theme)}
                title={translate(`themes.${theme}`)}
                isSelected={theme === settingsTheme}
              />
            );
          })}
        </View>
      </SettingGroup>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Sizing.t4,
  },
  themeList: {
    paddingHorizontal: Sizing.t4,
  },
});
