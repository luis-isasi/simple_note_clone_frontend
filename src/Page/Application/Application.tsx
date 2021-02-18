import * as React from 'react';

import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router';
import { Shortcuts } from 'shortcuts';
import { useMediaQuery } from 'react-responsive';

import { USER_SESSION_KEY } from 'Constants';
import Main from './components/Main';
import Info from './components/Info';
import Sidebar from './components/Sidebar';
import EditNote from './components/EditNote';
import { useAppContext } from 'ContextApp/AppContext';
import { useUserSettings } from 'Context/SettingsContext';

import { MainActive, MainNoActive, InfoActive, InfoNoActive } from 'StylesApp';
import ShortcutsModal from './Modals/ShortcutsModal';

const Application = () => {
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

  const [editNote, setEditNote] = React.useState(false);
  const [switchPinned, setSwitchPinned] = React.useState(false);
  const [textNote, setTextNote] = React.useState(undefined);

  const [showMarkdown, setShowMakdown] = React.useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 767px)',
  });

  const history = useHistory();
  const {
    settings: { theme },
  } = useUserSettings();

  React.useEffect(() => {
    const token = localStorage.getItem(USER_SESSION_KEY);
    if (!token) {
      history.push('/login');
      return;
    }
  }, []);

  React.useEffect(() => {
    if (note) {
      setTextNote(note.text);
    }
  }, [note]);

  React.useEffect(() => {
    const shortcuts = new Shortcuts();
    if (isDesktopOrLaptop) {
      shortcuts.add({
        shortcut: 'Ctrl+Shift+O',
        handler: (e) => {
          e.preventDefault();
          setShortcutsModal(!shortcutsModal);
        },
      });
    }
    return () => {
      if (isDesktopOrLaptop) {
        shortcuts.remove({ shortcut: 'Ctrl+Shift+O' });
      }
    };
  }, [shortcutsModal]);

  if (theme !== undefined) {
    return (
      <>
        <App>
          {main && <Main className="mainActive" id="main" />}
          <Div
            className={main ? 'showMain' : info && 'showInfo'}
            id="Application"
          >
            <Sidebar
              sidebar={sidebar}
              editNote={editNote}
              setEditNote={setEditNote}
              switchPinned={switchPinned}
              setSwitchPinned={setSwitchPinned}
              textNote={textNote}
            />
            <EditNote
              showMarkdown={showMarkdown}
              setShowMakdown={setShowMakdown}
              note={note}
              trash={trash}
              allNotes={allNotes}
              setEditNote={setEditNote}
              editNote={editNote}
              textNote={textNote}
              setTextNote={setTextNote}
            />
          </Div>
          {info && (
            <Info
              className="infoActive"
              id="info"
              setSwitchPinned={setSwitchPinned}
            />
          )}
        </App>
        {shortcutsModal && (
          <ShortcutsModal setShortcutsModal={setShortcutsModal} />
        )}
      </>
    );
  }

  return null;
};

//---------------STYLED------------
const App = styled.div`
  display: flex;
  flex-flow: row;
  height: 100vh;
  width: 100%;
  overflow: hidden;

  .showMain {
    > * {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .showInfo {
    position: relative;
    animation: ${InfoActive} 0.2s linear;
    right: 320px;

    * {
      opacity: 0.8;
      pointer-events: none;
    }
  }

  .hideInfo {
    animation: ${InfoNoActive} 0.2s linear;
    right: 0px;

    * {
      opacity: 0.8;
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

  * {
    //THEME
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;

const ShowNote = keyframes`
  0% {  right: 0px; }
  100% { right: 100%; }

`;

const Div = styled.div`
  display: flex;
  flex-flow: row;
  height: 100%;
  width: 100%;
  min-width: 100%;
  max-width: 100%;

  .showNote {
    position: relative;
    animation: ${ShowNote} 0.2 linear;
    right: 100%;
  }

  .sidebarNoActive {
    margin-left: -328px;
  }
`;

export default Application;
