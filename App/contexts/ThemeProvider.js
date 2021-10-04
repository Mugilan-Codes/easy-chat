import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext,
} from 'react';
import {Appearance} from 'react-native';
import {ThemeProvider as StyledProvider} from 'styled-components/native';
import {Provider as PaperProvider} from 'react-native-paper';

import {DarkTheme, LightTheme} from '../styles/theme';

const systemColorScheme = Appearance.getColorScheme() || 'light';

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const isDarkMode = systemColorScheme === 'dark';
  const [isDark, setIsDark] = useState(isDarkMode);

  let theme = isDark ? DarkTheme : LightTheme;

  console.log(`ThemeProvider isDark = ${isDark}`);

  const onThemeChange = ({colorScheme}) => {
    setIsDark(colorScheme === 'dark');
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(onThemeChange);

    return subscription;
  }, []);

  const value = useMemo(
    () => ({
      isDark,
      theme,
    }),
    [isDark, theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <PaperProvider theme={theme}>
        <StyledProvider theme={theme}>{children}</StyledProvider>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
