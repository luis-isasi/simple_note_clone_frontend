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

const AppContext = React.createContext<AppState | undefined>(undefined);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(undefined);

  React.useEffect(() => {
    const u = localStorage.getItem(USER_SESSION_KEY);
    if (u) {
      setUser(u);
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
    <AppContext.Provider
      value={{
        user: user,
        signinUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  const appData = React.useContext(AppContext);

  if (appData === undefined) {
    throw new Error('useAppContext must be within the ApContexProvider.');
  }

  return appData;
};
