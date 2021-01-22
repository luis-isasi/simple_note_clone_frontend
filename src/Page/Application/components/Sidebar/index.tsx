import * as React from 'react';

import { NoteContextProvider } from './context/NoteListContext';
import Sidebar from './Sidebar';

const index = () => {
  return (
    <NoteContextProvider>
      <Sidebar />
    </NoteContextProvider>
  );
};

export default index;
