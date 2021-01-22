import * as React from 'react';

import { NoteContextProvider } from './context/NoteContext';
import { SidebarContextProvider } from './context/SidebarContext';
import Application from './Application';

const index = () => {
  return (
    <NoteContextProvider>
      <SidebarContextProvider>
        <Application />
      </SidebarContextProvider>
    </NoteContextProvider>
  );
};

export default index;
