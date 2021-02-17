import * as React from 'react';
import ReactDOM from 'react-dom';

import styled, { css } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

import { useHistory } from 'react-router';

import { colorIcon, colorPinned } from 'StylesApp';
import { useSessionContext } from 'Context/AppSession';
import { useUserSettings } from 'Context/SettingsContext';
import Account from './components/Account';
import Display from './components/Display';

const SettingsModal = ({ setState }) => {
  const [nav, setNav] = React.useState({
    account: true,
    display: false,
  });

  const { settings, changeTheme } = useUserSettings();

  const history = useHistory();

  const {
    user: { email },
    logoutUser,
  } = useSessionContext();

  const onClick = () => {
    //cerramos el modal
    setState(false);
  };

  const handlerLogOut = () => {
    console.log('cerrando sesion ');
    logoutUser();
    history.push('/');
  };

  const handlerNav = (value) => () => {
    if (value === 'account') {
      setNav({
        account: true,
        display: false,
      });
    }

    if (value === 'display') {
      setNav({
        account: false,
        display: true,
      });
    }
  };

  return ReactDOM.createPortal(
    <ContentModal onClick={onClick}>
      <Modal
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="title">
          <span>Settings</span>
          <button onClick={onClick}>
            <CloseIcon />
          </button>
        </div>
        <div className="nav-settings">
          <button
            className={nav.account ? 'selected' : null}
            onClick={handlerNav('account')}
          >
            Account
          </button>
          <button
            className={nav.display ? 'selected' : null}
            onClick={handlerNav('display')}
          >
            Display
          </button>
        </div>
        {nav.account && <Account email={email} handlerLogOut={handlerLogOut} />}
        {nav.display && (
          <Display theme={settings.theme} changeTheme={changeTheme} />
        )}
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
  max-width: 520px;
  margin: 0px 8%;
  height: 384px;
  color: black;
  box-shadow: 0px 0px 8px ${(props) => props.theme.colorBorder},
    0px 0px 8px ${(props) => props.theme.colorBorder};
  font-size: 45px;

  .title {
    height: 52px;
    width: 100%;
    font-family: inherit;
    font-size: 14px;
    font-weight: bold;
    ${FlexRowCenter};
    border-bottom: 1px solid ${(props) => props.theme.colorBorder};

    * {
      font-family: inherit;
    }

    > span {
      flex-grow: 1;
      margin-left: 52px;
      text-align: center;
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

  .nav-settings {
    box-sizing: border-box;
    background-color: transparent;
    height: 44px;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.colorBorder};

    ${FlexRowCenter};

    > .selected {
      border-bottom: 2px solid ${colorPinned};
    }

    > button {
      box-sizing: border-box;
      background-color: transparent;

      height: 100%;
      width: 100px;
      border: none;
      cursor: pointer;
      color: ${colorPinned};
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;

      :active {
        background-color: ${colorPinned};
        color: #ffffff;
      }
    }
  }
`;

export default SettingsModal;
