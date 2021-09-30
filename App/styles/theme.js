import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import merge from 'deepmerge';

const custom = {
  common: {
    colors: {
      secondary: '#F53E27',
    },
  },
  light: {
    colors: {
      primary: '#000000',
      background: '#FFFFFF',
    },
  },
  dark: {
    colors: {
      primary: '#FFFFFF',
      background: '#000000',
    },
  },
};

const CombinedDefaultTheme = merge.all([
  NavigationDefaultTheme,
  custom.common,
  custom.light,
]);
const CombinedDarkTheme = merge.all([
  NavigationDarkTheme,
  custom.common,
  custom.dark,
]);

export {CombinedDefaultTheme as LightTheme, CombinedDarkTheme as DarkTheme};
