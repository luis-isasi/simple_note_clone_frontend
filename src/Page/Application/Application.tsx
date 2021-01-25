import * as React from 'react';

import styled from 'styled-components';

import Sidebar from './components/Sidebar';
import HeaderApp from './components/HeaderApp';
import Note from './components/Note';
import { useAppContext } from 'ContextApp/AppContext';

const App = () => {
  const dataApp = useAppContext();

  return (
    <Div toggleSidebar={dataApp.sidebar}>
      {dataApp.sidebar && <Sidebar className="sidebar" />}
      {/* <div style={{ backgroundColor: 'white' }} className="sidebar">
        SIDEBAR
      </div>
      <div style={{ backgroundColor: 'white' }} className="headerApp">
        HEADER app
      </div>
      <div style={{ backgroundColor: 'white' }} className="note">
        {' '}
        NOTE{' '}
      </div> */}

      <HeaderApp className="headerApp" />
      <Note className="note" />
    </Div>
  );
};

const toggleSidebarTrue = `'sidebar headerApp'
'sidebar note'`;

const toggleSidebarfalse = `'headerApp' 'note'`;

const Div = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-areas: ${(props) =>
    props.toggleSidebar ? toggleSidebarTrue : toggleSidebarfalse};
  grid-template-rows: 56px 1fr;
  grid-template-columns: ${(props) =>
    props.toggleSidebar ? ' 325px 1fr' : '1fr'};

  .sidebar {
    grid-area: sidebar;
  }

  .headerApp {
    grid-area: headerApp;
    border-bottom: 1px solid #c3c4c7;
  }
  .note {
    grid-area: note;
  }

  div {
    /* background-color: #ffffff; */
  }
`;

export default App;
