import * as React from 'react';

import styled from 'styled-components';

import AllNotes from './components/AllNotes';
import Trash from './components/Trash';
import Settings from './components/Settings';

const MainOptions = () => {
  return (
    <Div>
      <AllNotes />
      <Trash />
      <Settings />
    </Div>
  );
};

// --------------styled------------

const Div = styled.div``;
export default MainOptions;
