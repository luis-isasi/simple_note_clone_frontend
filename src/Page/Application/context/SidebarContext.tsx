import * as React from 'react';

type SidebarState = {
  state: boolean;
  setSidebar(state: boolean): void;
};

const SidebarContext = React.createContext<SidebarState | undefined>(undefined);

export const SidebarContextProvider = ({ children }) => {
  const [state, setSidebar] = React.useState(true);

  return (
    <SidebarContext.Provider value={{ state, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const sidebarData = React.useContext(SidebarContext);

  if (sidebarData === undefined) {
    throw new Error(
      'useSidebarContext must be inside the SidebarContextProvider'
    );
  }

  return sidebarData;
};
