import * as React from 'react';

import styled from 'styled-components';

import { useAppContext } from 'ContextApp/AppContext';
import AllNotes from './components/AllNotes';
import Trash from './components/Trash';
import Settings from './components/Settings';

const MainOptions = () => {
  const {
    allNotes,
    setAllNotes,
    trash,
    setTrash,
    setSearchTag,
    showMain,
  } = useAppContext();

  return (
    <Div>
      <AllNotes
        allNotes={allNotes}
        setAllNotes={setAllNotes}
        setTrash={setTrash}
        setSearchTag={setSearchTag}
        showMain={showMain}
      />
      <Trash
        trash={trash}
        setTrash={setTrash}
        setAllNotes={setAllNotes}
        setSearchTag={setSearchTag}
        showMain={showMain}
      />
      <Settings />
    </Div>
  );
};

// --------------styled------------

const Div = styled.div``;

export default MainOptions;
