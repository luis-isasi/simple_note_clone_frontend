import * as React from 'react';

import styled from 'styled-components';
import { useHistory } from 'react-router';
import { Shortcut, Shortcuts } from 'shortcuts';

import { USER_SESSION_KEY } from 'Constants';
import Main from './components/Main';
import Info from './components/Info';
import Sidebar from './components/Sidebar';
import HeaderApp from './components/HeaderApp';
import Note from './components/Note';
import { useAppContext } from 'ContextApp/AppContext';
import {
  MainActive,
  MainNoActive,
  InfoActive,
  InfoNoActive,
  SidebarNoActive,
} from 'StylesApp';
import ShortcutsModal from './Modals/ShortcutsModal';

const App = () => {
  const {
    main,
    info,
    sidebar,
    shortcutsModal,
    setShortcutsModal,
  } = useAppContext();
  const history = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem(USER_SESSION_KEY);
    if (!token) {
      history.push('/login');
      return;
    }
  }, []);

  React.useEffect(() => {
    const shortcuts = new Shortcuts();
    shortcuts.add({
      shortcut: 'Ctrl+Shift+O',
      handler: (e) => {
        e.preventDefault();
        setShortcutsModal(!shortcutsModal);
      },
    });
    return () => {
      shortcuts.remove({ shortcut: 'Ctrl+Shift+O' });
    };
  }, [shortcutsModal]);

  return (
    <>
      <DivApp>
        {main && (
          <Main
            className="mainActive"
            id="main"
            setShortcutsModal={setShortcutsModal}
          />
        )}
        <Div className={(main || info) && 'hideApp'} id="Application">
          <Sidebar className={!sidebar && 'sidebarNoActive'} />
          <Content>
            <HeaderApp className="headerApp" />
            <Note className="note" />
          </Content>
        </Div>
        {info && <Info className="infoActive" id="info" />}
      </DivApp>
      {shortcutsModal && (
        <ShortcutsModal setShortcutsModal={setShortcutsModal} />
      )}
    </>
  );
};

//---------------STYLE------------
const DivApp = styled.div`
  display: flex;
  flex-flow: row;
  height: 100vh;
  width: 100%;
  overflow: hidden;

  .hideApp {
    opacity: 0.35;
    * {
      pointer-events: none;
    }
  }

  .mainActive {
    animation: ${MainActive} 0.2s linear;
    margin-left: 0px;
  }

  .mainNoActive {
    animation: ${MainNoActive} 0.2s linear;
    margin-left: -260px;
  }

  .infoActive {
    animation: ${InfoActive} 0.2s linear;
    margin-right: 0px;
  }

  .infoNoActive {
    animation: ${InfoNoActive} 0.2s linear;
    margin-right: -328px;
  }
`;

const Div = styled.div`
  display: flex;
  flex-flow: row;
  height: 100%;
  width: 100%;

  .sidebarNoActive {
    margin-left: -328px;
    animation: ${SidebarNoActive} 0.25s;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

export default App;
