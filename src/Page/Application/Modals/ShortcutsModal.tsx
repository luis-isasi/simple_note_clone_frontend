import * as React from 'react';
import ReactDOM from 'react-dom';

import styled, { css } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

import { colorIcon, scrollbarStyle } from 'StylesApp';

const ShortcutsModal = ({ setIsOpenModalShortcuts }) => {
  const onClick = () => {
    setIsOpenModalShortcuts(false);
  };

  const ViewShortcuts = [
    {
      id: '0',
      letters: ['Ctrl', 'Shift', 'O'],
      description: 'Show keyboard shortcuts',
    },
    {
      id: '1',
      letters: ['Ctrl', 'Shift', 'F'],
      description: 'Show sidebar',
    },
    {
      id: '2',
      letters: ['Ctrl', 'Shift', 'S'],
      description: 'Focus search field',
    },
  ];

  const NavigationShortcuts = [
    {
      id: '0',

      letters: ['Ctrl', 'Shift', 'U'],
      description: 'Toggle tag list',
    },
    {
      id: '1',
      letters: ['Ctrl', 'Shift', 'Y'],
      description: 'Show note information',
    },
    {
      id: '2',
      letters: ['Ctrl', 'Shift', 'J'],
      description: 'Open note above current none ',
    },
    {
      id: '3',
      letters: ['Ctrl', 'Shift', 'K'],
      description: 'Open note below current none ',
    },
  ];

  const NoteEditingShortcuts = [
    {
      id: '0',
      letters: ['Ctrl', 'Shift', 'L'],
      description: 'Create new note',
    },
  ];

  const renderShortcuts = (shortcuts) => {
    return shortcuts.map(({ id, letters, description }) => (
      <li key={id}>
        <div className="content-keys">
          {letters.map((letter, index) => {
            return (
              <React.Fragment key={`${id}-${letter}`}>
                <Letter key={`${id}-${letter}`}>{letter}</Letter>
                {index !== letters.length - 1 ? '+' : null}
              </React.Fragment>
            );
          })}
        </div>
        <p className="ul-separation">{'-'}</p>
        <div className="content-description">
          <p className="shortcut-description">{description}</p>
        </div>
      </li>
    ));
  };

  return ReactDOM.createPortal(
    <ContentModal onClick={onClick}>
      <Modal
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="title">
          <span>Keyboard Shortcuts</span>
          <button onClick={onClick}>
            <CloseIcon />
          </button>
        </div>
        <ContentShortcuts>
          <Div>
            <p className="title-shortcut">View</p>
            <ul className="list-shortcuts">{renderShortcuts(ViewShortcuts)}</ul>
          </Div>
          <Div>
            <p className="title-shortcut">Navigation</p>
            <ul className="list-shortcuts">
              {renderShortcuts(NavigationShortcuts)}
            </ul>
          </Div>
          <Div>
            <p className="title-shortcut">Note Editing</p>
            <ul className="list-shortcuts">
              {renderShortcuts(NoteEditingShortcuts)}
            </ul>
          </Div>
        </ContentShortcuts>
      </Modal>
    </ContentModal>,
    document.querySelector('#modal')
  );
};

//-------------Styled-------------
const FlexRowCenter = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FlexColCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentModal = styled.div`
  background-color: ${(props) => props.theme.backgroundContentModal};

  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0px;
  left: 0px;
  ${FlexColCenter}

  * {
    color: ${(props) => props.theme.colorText};
  }
`;

const Modal = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  width: 84%;
  max-width: 500px;
  margin: 0px 8%;
  height: 548px;
  box-shadow: 0px 0px 8px ${(props) => props.theme.colorBorder},
    0px 0px 8px ${(props) => props.theme.colorBorder};

  * {
    font-family: inherit;
  }

  .title {
    height: 52px;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    ${FlexRowCenter};
    border-bottom: 1px solid ${(props) => props.theme.colorBorder};

    > span {
      flex-grow: 1;
      margin-left: 52px;
      text-align: center;
      font-size: 16px;
    }

    > button {
      color: ${colorIcon};
      background-color: transparent;
      border: none;
      height: 100%;
      width: 52px;
      padding: 0px;
      cursor: pointer;
    }
  }
`;
const ContentShortcuts = styled.div`
  padding: 10px 20px 20px 20px;
  overflow-y: scroll;
  height: 465px;

  ${scrollbarStyle}
`;
const Div = styled.div`
  padding-bottom: 8px;

  > .title-shortcut {
    font-size: 18px;
    font-weight: bold;
    margin: 12px 0px;
    width: 100%;
    padding: 8px 0px;
  }

  > .list-shortcuts {
    width: 100%;

    > li {
      display: flex;
      flex-wrap: row wrap;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 12px 0px;

      > .ul-separation {
        margin: 0px 8px;
      }

      > .content-keys {
        width: 50%;
        max-width: 230px;
        min-width: 160px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        > * {
          margin: 0px 6px;
        }
      }

      > .content-description {
        width: 50%;

        > .shortcut-description {
          text-align: left;
          font-size: 14px;
          font-weight: 300;
          width: 100%;
        }
      }
    }
  }
`;

const Letter = styled.p`
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colorText};
  padding: 2px 5px;
  font-family: monospace, monospace;
  font-size: 13px;
  ${FlexRowCenter}
`;
export default ShortcutsModal;
