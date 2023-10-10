import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {darkTheme, lightTheme} from './themes';

export const darkNavigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: darkTheme['background-basic-color-2'],
    border: darkTheme['background-basic-color-2'],
    card: darkTheme['background-basic-color-2'],
    primary: darkTheme['color-primary-200'],
    text: '#ddd',
  },
};

export const lightNavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: lightTheme['background-basic-color-2'],
    border: lightTheme['background-basic-color-1'],
    card: lightTheme['background-basic-color-1'],
    primary: lightTheme['color-primary-500'],
  },
};

export const defaultStackStyling = (
  darkMode: boolean,
): NativeStackNavigationOptions => {
  return {
    headerStyle: {
      backgroundColor: darkMode
        ? darkTheme['background-basic-color-2']
        : lightTheme['background-basic-color-1'],
    },
    headerLargeStyle: {
      backgroundColor: darkMode
        ? darkTheme['background-basic-color-2']
        : lightTheme['background-basic-color-2'],
    },
    headerTitleStyle: {
      fontFamily: 'Poppins-Medium',
    },
    headerBackTitleStyle: {
      fontFamily: 'Poppins-Regular',
    },
  };
};
