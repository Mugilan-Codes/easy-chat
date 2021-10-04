import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

const customCommonTheme = {
  colors: {
    secondary: '#F53E27',
  },
};
const customLightTheme = {
  colors: {
    primary: '#000000',
    // background: '#FFFFFF',
  },
};
const customDarkTheme = {
  colors: {
    primary: '#FFFFFF',
    // background: '#000000',
  },
};

const CombinedDefaultTheme = merge.all([
  PaperDefaultTheme,
  NavigationDefaultTheme,
  customCommonTheme,
  customLightTheme,
]);
const CombinedDarkTheme = merge.all([
  PaperDarkTheme,
  NavigationDarkTheme,
  customCommonTheme,
  customDarkTheme,
]);

export {CombinedDefaultTheme as LightTheme, CombinedDarkTheme as DarkTheme};
