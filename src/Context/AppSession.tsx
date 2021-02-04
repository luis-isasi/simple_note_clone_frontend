import * as React from 'react';

import { USER_SESSION_KEY } from '../Constants';

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
        email: u.user.email,
        id: u.user.id,
      });
    }
  }, []);

  const signinUser = (data: RawUser) => {
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(data));
    setUser({
      token: data.token,
      email: data.user.email,
      id: data.user.id,
    });
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
