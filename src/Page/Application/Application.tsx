import * as React from 'react';

import styled from 'styled-components';

import { NoteContextProvider } from 'Context/NoteContext';
import SidebarSearch from './components/SidebarSearch';
import ListNotes from './components/ListNotes';
import Note from './components/Note';

const App = () => {
  return (
    <NoteContextProvider>
      <Div>
        <SidebarSearch />
        <div></div>
        <ListNotes />
        <Note />
      </Div>
    </NoteContextProvider>
  );
};

const Div = styled.div`
  background-color: skyblue;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 325px 1fr;
  grid-template-rows: 56px 1fr;
  gap: 4px;

  div {
    padding: 20px 0;
    font-size: 30px;
    background-color: white;
  }
`;
export default App;
