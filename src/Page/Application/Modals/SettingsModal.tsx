import * as React from 'react';
import ReactDOM from 'react-dom';

import styled, { css } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useHistory } from 'react-router';

import { colorIcon, colorBorder } from 'StylesApp';
// import { useAppContext } from 'ContextApp/AppContext';
import { useSessionContext } from 'Context/AppSession';

const SettingsModal = ({ setState }) => {
  const history = useHistory();
  const {
    user: {
      user: { email },
    },
    logoutUser,
  } = useSessionContext();

  const onClick = () => {
    //cerramos el modal
    setState(false);
  };

  const handledLogOut = () => {
    console.log('cerrando sesion ');
    logoutUser();
    history.push('/');
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
        <div className="content">
          <div className="content-div">
            <p className="content-text">ACCOUNT</p>
            <div className="content-gmail">{`${email}`}</div>
            <div className="content-editAccount">
              <p>Edit Account</p>
              <ArrowUpwardIcon style={{ transform: 'rotate(45deg)' }} />
            </div>
          </div>
          <button className="content-btn" onClick={handledLogOut}>
            Log Out
          </button>
        </div>
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
  background-color: rgba(255, 255, 255, 0.5);

  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0px;
  left: 0px;
  ${FlexColCenter}
`;

const Modal = styled.div`
  background-color: #ffffff;
  width: 84%;
  max-width: 520px;
  margin: 0px 8%;
  height: 340px;
  color: black;
  box-shadow: 0px 0px 8px ${colorBorder}, 0px 0px 8px ${colorBorder};
  font-size: 45px;

  .title {
    height: 52px;
    width: 100%;
    font-family: inherit;
    font-size: 14px;
    font-weight: bold;
    ${FlexRowCenter};
    border-bottom: 1px solid ${colorBorder};

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

  .content {
    height: 264px;
    width: 84%;
    margin: 0px 8%;
    ${FlexColCenter};

    * {
      font-family: inherit;
    }

    .content-div {
      max-width: 352px;
      width: 100%;
      height: 140px;
      ${FlexColCenter}
      justify-content: flex-start;

      > * {
        width: 100%;
      }

      .content-text {
        color: #a1a4a8;
        font-size: 14px;
        font-weight: bold;
        margin: 4px 0px;
      }

      .content-gmail {
        border: 1px solid ${colorBorder};
        font-size: 14px;
        text-align: center;
        height: 42px;
        ${FlexRowCenter}
      }

      .content-editAccount {
        margin-top: 24px;
        font-size: 14px;
        color: ${colorIcon};
        ${FlexRowCenter};
      }
    }
    .content-btn {
      background-color: ${colorIcon};
      border: none;
      border-radius: 4px;
      color: #ffffff;
      height: 42px;
      max-width: 352px;
      width: 100%;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      ${FlexRowCenter}
    }
  }
`;

export default SettingsModal;
