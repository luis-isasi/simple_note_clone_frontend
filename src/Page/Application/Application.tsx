import * as React from 'react';

import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router';
import { Shortcuts } from 'shortcuts';
import { useMediaQuery } from 'react-responsive';

import { USER_SESSION_KEY } from 'Constants';
import Main from './components/Main';
import Info from './components/Info';
import SidebarDesktop from './components/Sidebar/SidebarDesktop';
import SidebarMovil from './components/Sidebar/SidebarMovil';

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
    allNotes,
    note,
    trash,
  } = useAppContext();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 750px)',
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 750px)' });

  const history = useHistory();
  const [showMarkdown, setShowMakdown] = React.useState(false);

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
        {main && <Main className="mainActive" id="main" />}
        <Div
          className={main ? 'showMain' : info && 'showInfo'}
          id="Application"
        >
          {isDesktopOrLaptop ? (
            <SidebarDesktop className={!sidebar && 'sidebarNoActive'} />
          ) : (
            <SidebarMovil className={!sidebar && 'sidebarNoActive'} />
          )}

          {isDesktopOrLaptop && (
            <Content>
              <HeaderApp
                showMarkdown={showMarkdown}
                setShowMakdown={setShowMakdown}
                note={note}
                trash={trash}
                allNotes={allNotes}
              />
              <Note showMarkdown={showMarkdown} note={note} trash={trash} />
            </Content>
          )}
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

  .showMain {
    opacity: 0.35;

    * {
      pointer-events: none;
    }
  }

  .showInfo {
    opacity: 0.35;
    position: relative;
    animation: ${InfoActive} 0.2s linear;
    right: 320px;

    * {
      pointer-events: none;
    }
  }

  .hideInfo {
    opacity: 0.35;
    animation: ${InfoNoActive} 0.2s linear;
    right: 0px;

    * {
      pointer-events: none;
    }
  }

  .mainActive {
    animation: ${MainActive} 0.2s linear;
    margin-left: 0px;
  }

  .hidingMain {
    animation: ${MainNoActive} 0.2s linear;
    margin-left: -260px;
  }

  .infoActive {
    animation: ${InfoActive} 0.2s linear;
    right: 320px;
  }

  .hidingInfo {
    animation: ${InfoNoActive} 0.2s linear;
    right: 0px;
  }
`;

const Div = styled.div`
  display: flex;
  flex-flow: row;
  height: 100%;
  width: 100%;
  min-width: 100%;
  max-width: 100%;

  .sidebarNoActive {
    animation: ${SidebarNoActive} 0.2s linear;
    margin-left: -328px;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

export default App;
