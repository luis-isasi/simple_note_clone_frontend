import * as React from 'react';

import styled from 'styled-components';

import { useAppContext } from 'ContextApp/AppContext';
import AllNotes from './components/AllNotes';
import Trash from './components/Trash';
import Settings from './components/Settings';

const MainOptions = () => {
  const { allNotes, setAllNotes, trash, setTrash } = useAppContext();

  return (
    <Div>
      <AllNotes
        allNotes={allNotes}
        setAllNotes={setAllNotes}
        setTrash={setTrash}
      />
      <Trash trash={trash} setTrash={setTrash} setAllNotes={setAllNotes} />
      <Settings />
    </Div>
  );
};

// --------------styled------------

const Div = styled.div``;

export default MainOptions;
