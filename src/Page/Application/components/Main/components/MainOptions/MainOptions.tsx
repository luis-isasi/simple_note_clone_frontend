import * as React from 'react';

import styled from 'styled-components';

import { useAppContext } from 'ContextApp/AppContext';
import AllNotes from './components/AllNotes';
import Trash from './components/Trash';
import Settings from './components/Settings';

const MainOptions = () => {
  const {
    isAllNotes,
    setIsAllNotes,
    isTrash,
    setIsTrash,
    setSearchTag,
    showMain,
  } = useAppContext();

  return (
    <Div>
      <AllNotes
        isAllNotes={isAllNotes}
        setIsAllNotes={setIsAllNotes}
        setIsTrash={setIsTrash}
        setSearchTag={setSearchTag}
        showMain={showMain}
      />
      <Trash
        isTrash={isTrash}
        setIsAllNotes={setIsAllNotes}
        setIsTrash={setIsTrash}
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
