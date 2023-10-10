import React from 'react';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import libraries from '../libraries.json';
import {translate} from '../utils/translation';
import {LibraryList} from './libraryList.component';

export const settingsLicensesRouteOptions =
  (): NativeStackNavigationOptions => ({
    title: `${translate('settings.licenses')}`,
  });

export const SettingsLicensesScreen = () => {
  return <LibraryList libraries={libraries} />;
};
