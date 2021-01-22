import * as React from 'react';

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [main, setMain] = React.useState(false);
  const [info, setInfo] = React.useState(false);

  return <AppContext.Provider value={ }>{children}</AppContext.Provider>;
};
