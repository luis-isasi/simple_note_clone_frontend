import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { USER_SETTINGS } from 'Constants';
import { themeDark, themeLight } from 'StylesApp';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

type ContextState = {
  settings: {
    theme: ThemeMode;
  };
  changeTheme(theme: ThemeMode): void;
};

const SettingsContext = React.createContext<ContextState | undefined>(
  undefined
);

export const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = React.useState<ContextState['settings']>({
    theme: ThemeMode.LIGHT,
  });

  React.useEffect(() => {
    const settings = localStorage.getItem(USER_SETTINGS);
    if (settings) {
      try {
        const settingsData = JSON.parse(settings);
        setSettings(settingsData);
      } catch (error) {
        console.error(error);
        localStorage.removeItem(USER_SETTINGS);
        setSettings({
          theme: ThemeMode.LIGHT,
        });
      }
    } else {
      setSettings({
        theme: ThemeMode.LIGHT,
      });
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(USER_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  const changeTheme = (theme: ThemeMode) => {
    setSettings({
      ...settings,
      theme,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        changeTheme,
      }}
    >
      <ThemeProvider
        theme={settings.theme === ThemeMode.LIGHT ? themeLight : themeDark}
      >
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
};

export const useUserSettings = () => {
  const settings = React.useContext(SettingsContext);

  if (settings === undefined) {
    throw new Error('useTheme must be within ThemeProvider');
  }

  return settings;
};
