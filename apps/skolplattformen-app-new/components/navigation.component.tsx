import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Child as ChildType, NewsItem as NewsItemType} from '../libs/api/lib';
import {useApi} from '../libs/hooks/src';
import {useTheme} from '@ui-kitten/components';
import {Library} from 'libraries.json';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {schema} from '../app.json';
import {
  darkNavigationTheme,
  lightNavigationTheme,
} from '../design/navigationThemes';
import {useAppState} from '../hooks/useAppState';
import {useLangCode} from '../hooks/useLangCode';
import useSettingsStorage, {
  initializeSettingsState,
} from '../hooks/useSettingsStorage';
import {isRTL} from '../services/languageService';
import Absence, {absenceRouteOptions} from './absence.component';
import {Auth, authRouteOptions} from './auth.component';
import {Child, childRouteOptions} from './child.component';
import {childenRouteOptions, Children} from './children.component';
import {libraryRouteOptions, LibraryScreen} from './library.component';
import {NewsItem, newsItemRouteOptions} from './newsItem.component';
import {SetLanguage, setLanguageRouteOptions} from './setLanguage.component';
import {settingsRouteOptions, SettingsScreen} from './settings.component';
import {
  settingsAppearanceRouteOptions,
  SettingsAppearanceScreen,
} from './settingsAppearance.component';
import {
  settingsAppearanceThemeRouteOptions,
  SettingsAppearanceThemeScreen,
} from './settingsAppearanceTheme.component';
import {
  settingsLicensesRouteOptions,
  SettingsLicensesScreen,
} from './settingsLicenses.component';

export type RootStackParamList = {
  Login: undefined;
  IsLoggedIn: undefined;
  Children: undefined;
  Settings: {rand?: number} | undefined;
  SettingsAppearance: undefined;
  SettingsAppearanceTheme: undefined;
  SettingsLicenses: undefined;
  Library: {
    library: Library;
  };
  Child: {
    child: ChildType;
    color: string;
    initialRouteName?: string;
  };
  NewsItem: {newsItem: NewsItemType; child: ChildType};
  Absence: {child: ChildType};
  SetLanguage: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: [schema],
  config: {
    screens: {
      Login: 'login',
    },
  },
};

export const AppNavigator = () => {
  const {isLoggedIn, api} = useApi();

  const [usingSystemTheme] = useSettingsStorage('usingSystemTheme');
  const [theme] = useSettingsStorage('theme');
  const systemTheme = useColorScheme();
  const colorScheme = usingSystemTheme ? systemTheme : theme;
  const langCode = useLangCode();

  const colors = useTheme();

  const currentAppState = useAppState();

  useEffect(() => {
    initializeSettingsState();
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      if (currentAppState === 'active' && isLoggedIn) {
        const {isAuthenticated} = await api.getUser();

        if (!isAuthenticated) {
          await api.logout();
        }
      }
    };
    checkUser();
  }, [currentAppState, isLoggedIn, api]);

  return (
    <NavigationContainer
      linking={linking}
      theme={
        colorScheme === 'dark' ? darkNavigationTheme : lightNavigationTheme
      }>
      <StatusBar />

      <Navigator
        screenOptions={() => ({
          headerLargeTitle: false,
          headerLargeTitleHideShadow: true,
          direction: isRTL(langCode) ? 'rtl' : 'ltr',
          headerStyle: {
            backgroundColor:
              colorScheme === 'dark'
                ? colors['background-basic-color-2']
                : colors['background-basic-color-1'],
          },
          headerLargeStyle: {
            backgroundColor: colors['background-basic-color-2'],
          },
          headerLargeTitleStyle: {
            fontFamily: 'Poppins-ExtraBold',
          },
        })}>
        {isLoggedIn ? (
          <>
            <Screen
              name="Children"
              component={Children}
              options={childenRouteOptions(colorScheme === 'dark')}
            />
            <Screen
              name="Child"
              component={Child}
              options={childRouteOptions(colorScheme === 'dark')}
            />
            <Screen
              name="NewsItem"
              component={NewsItem}
              options={newsItemRouteOptions(colorScheme === 'dark')}
            />
            <Screen
              name="Absence"
              component={Absence}
              options={absenceRouteOptions(colorScheme === 'dark')}
            />
          </>
        ) : (
          <Screen name="Login" component={Auth} options={authRouteOptions} />
        )}
        <Screen
          name="SetLanguage"
          component={SetLanguage}
          options={setLanguageRouteOptions}
        />
        <Screen
          name="Settings"
          component={SettingsScreen}
          options={settingsRouteOptions}
        />
        <Screen
          name="SettingsAppearance"
          component={SettingsAppearanceScreen}
          options={settingsAppearanceRouteOptions}
        />
        <Screen
          name="SettingsAppearanceTheme"
          component={SettingsAppearanceThemeScreen}
          options={settingsAppearanceThemeRouteOptions}
        />
        <Screen
          name="SettingsLicenses"
          component={SettingsLicensesScreen}
          options={settingsLicensesRouteOptions}
        />
        <Screen
          name="Library"
          component={LibraryScreen}
          options={libraryRouteOptions}
        />
      </Navigator>
    </NavigationContainer>
  );
};
