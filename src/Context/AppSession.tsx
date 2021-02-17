import * as React from 'react';

import { USER_SESSION_KEY, USER_SETTINGS } from '../Constants';

type RawUser = {
  token: string;
  user: {
    email: string;
    id: string;
  };
};

type AppState = {
  user?: {
    token: string;
    email: string;
    id: string;
    Theme: string;
  };
  signinUser(data: RawUser): void;
  logoutUser(): void;
};

const AppContextSession = React.createContext<AppState | undefined>(undefined);

export const AppSessionProvider = ({ children }) => {
  const [user, setUser] = React.useState(undefined);

  React.useEffect(() => {
    const u = JSON.parse(localStorage.getItem(USER_SESSION_KEY));

    if (u) {
      setUser({
        token: u.token,
        email: u.email,
        id: u.id,
      });
    }
  }, []);

  const signinUser = (_data: RawUser) => {
    // const user_settings = JSON.parse(localStorage.getItem(USER_SETTINGS));

    const data = {
      token: _data.token,
      email: _data.user.email,
      id: _data.user.id,
    };

    //verificamos que se este haciendo un nuevo login con otro user
    //para poder restablecer user_settings
    // if (user_settings) {
    //   if (user_settings.email !== _data.user.email) {
    //     const newSettings = {
    //       // email: _data.user.email,
    //       theme: 'light',
    //     };

    //     localStorage.setItem(USER_SETTINGS, JSON.stringify(newSettings));
    //   }
    // } else {
    //   // const newSettings = {
    //   //   // email: _data.user.email,
    //   //   // theme: 'light',
    //   // };

    //   // localStorage.setItem(USER_SETTINGS, JSON.stringify(newSettings));
    // }

    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(data));
    setUser(data);
  };

  const logoutUser = () => {
    localStorage.removeItem(USER_SESSION_KEY);
    setUser(undefined);
  };

  return (
    <AppContextSession.Provider
      value={{
        user,
        signinUser,
        logoutUser,
      }}
    >
      {children}
    </AppContextSession.Provider>
  );
};
export const useSessionContext = () => {
  const appSession = React.useContext(AppContextSession);

  if (appSession === undefined) {
    throw new Error('useAppContext must be within the ApContexProvider.');
  }

  return appSession;
};
