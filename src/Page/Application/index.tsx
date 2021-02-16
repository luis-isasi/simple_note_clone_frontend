import * as React from 'react';

import { AppContextProvider } from 'ContextApp/AppContext';
import Application from './Application';

const index = () => {
  return (
    <AppContextProvider>
      <Application />
    </AppContextProvider>
  );
};

export default index;
