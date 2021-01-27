import * as React from 'react';

type AppState = {
  note: Note;
  setNote(note: Note): void;
  sidebar: boolean;
  setSidebar(sidebar: boolean): void;
  main: boolean;
  setMain(main: boolean): void;
  info: boolean;
  setInfo(info: boolean): void;
};

type Note = {
  id: string;
  text: string;
  user: User;
};

type User = {
  id: string;
  email: string;
};

const AppContext = React.createContext<AppState | undefined>(undefined);

export const AppContextProvider = ({ children }) => {
  const [note, setNote] = React.useState(undefined);
  const [sidebar, setSidebar] = React.useState(true);
  const [main, setMain] = React.useState(true);
  const [info, setInfo] = React.useState(false);

  return (
    <AppContext.Provider
      value={{
        note,
        setNote,
        sidebar,
        setSidebar,
        main,
        setMain,
        info,
        setInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const dataApp = React.useContext(AppContext);

  if (dataApp === undefined) {
    throw new Error('useAppContext must be inside AppContextProvider ');
  }
  return dataApp;
};
