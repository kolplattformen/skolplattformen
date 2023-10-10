import * as eva from '@eva-design/eva';
import darkJsonTheme from './dark.json';
import lightJsonTheme from './light.json';

export const darkTheme = {
  ...eva.dark,
  ...darkJsonTheme,
};
export const lightTheme = {
  ...eva.light,
  ...lightJsonTheme,
};
