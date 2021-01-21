import * as React from 'react';

import styled, { keyframes } from 'styled-components';

import Sidebar from './components/Sidebar';
import HeaderApp from './components/HeaderApp';
import Note from './components/Note';

import { useSidebarContext } from './context/SidebarContext';

const App = () => {
  const sidebarData = useSidebarContext();

  return (
    <Div toggleSidebar={sidebarData.state}>
      {sidebarData.state && <Sidebar className="sidebar" />}
      <HeaderApp className="headerApp" />
      <Note className="note" />
    </Div>
  );
};

const toggleSidebarTrue = `'sidebar headerApp'
'sidebar note'`;

const toggleSidebarfalse = `'headerApp' 'note'`;

const Div = styled.div`
  background-color: #c3c4c7;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-areas: ${(props) =>
    props.toggleSidebar ? toggleSidebarTrue : toggleSidebarfalse};
  grid-template-rows: 56px 1fr;
  grid-template-columns: ${(props) =>
    props.toggleSidebar ? ' 325px 1fr' : '1fr'};
  gap: 1px;

  .sidebar {
    grid-area: sidebar;
  }

  .headerApp {
    grid-area: headerApp;
  }
  .note {
    grid-area: note;
  }

  div {
    background-color: #ffffff;
  }
`;

export default App;
