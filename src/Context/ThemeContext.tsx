import * as React from 'react';

import { ThemeProvider } from 'styled-components';
import { USER_SETTINGS } from 'Constants';
import { Theme } from 'TypesApp';
import { themeDark, themeLight } from 'StylesApp';

type ThemeState = {
  theme: string;
  changeTheme(mode: string): void;
  themeStyle: Theme;
};

const ThemeContext = React.createContext<ThemeState | undefined>(undefined);

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(undefined);
  const [themeStyle, setThemeStyle] = React.useState<Theme>(undefined);

  const user_settings = JSON.parse(localStorage.getItem(USER_SETTINGS));

  React.useEffect(() => {
    if (user_settings) {
      const { theme } = user_settings;

      setTheme(theme);
      if (theme === 'Light') {
        setThemeStyle(themeLight);
      }
      if (theme === 'Dark') {
        setThemeStyle(themeDark);
      }
    }
  }, []);

  React.useEffect(() => {
    //Nos aseguramos que theme contenga algo para no asinar DARK mientras carga
    if (theme) {
      if (theme === 'Light') {
        setThemeStyle(themeLight);
      }
      if (theme === 'Dark') {
        setThemeStyle(themeDark);
      }
    }
  }, [theme]);

  const changeTheme = (mode: string) => {
    if (mode === 'Light') {
      if (user_settings) {
        const data = {
          ...user_settings,
          theme: 'Light',
        };
        localStorage.setItem(USER_SETTINGS, JSON.stringify(data));
      }
    }

    if (mode === 'Dark') {
      if (user_settings) {
        const data = {
          ...user_settings,
          theme: 'Dark',
        };
        localStorage.setItem(USER_SETTINGS, JSON.stringify(data));
      }
    }

    setTheme(mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        themeStyle,
      }}
    >
      <ThemeProvider theme={themeStyle}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const dataTheme = React.useContext(ThemeContext);

  if (dataTheme === undefined) {
    throw new Error('useTheme must be within ThemeProvider');
  }

  return dataTheme;
};
