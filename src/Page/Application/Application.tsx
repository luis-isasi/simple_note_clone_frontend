import * as React from 'react';

import styled from 'styled-components';

import { NoteContextProvider } from 'Page/Application/context/NoteContext';
import SidebarSearch from './components/SidebarSearch';
import ListNotes from './components/ListNotes';
import Note from './components/Note';

const App = () => {
  return (
    <NoteContextProvider>
      <Div color="test">
        <SidebarSearch />
        <div></div>
        <ListNotes />
        <Note />
      </Div>
    </NoteContextProvider>
  );
};

const Div = styled.div`
  background-color: #c3c4c7;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 325px 1fr;
  grid-template-rows: 56px 1fr;
  gap: 1px;

  div {
    background-color: white;
  }
`;
export default App;
