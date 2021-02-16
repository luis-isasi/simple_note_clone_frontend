import * as React from 'react';

import styled, { css } from 'styled-components';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { colorPinned } from 'StylesApp';

const Account = ({ email, handlerLogOut }) => {
  return (
    <Div className="content">
      <div className="content-div">
        <p className="content-text">ACCOUNT</p>
        <div className="content-gmail">{`${email}`}</div>
        <div className="content-editAccount">
          <p>Edit Account</p>
          <ArrowUpwardIcon style={{ transform: 'rotate(45deg)' }} />
        </div>
      </div>
      <button className="content-btn" onClick={handlerLogOut}>
        Log Out
      </button>
    </Div>
  );
};

//------------STYLED------------
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

const Div = styled.div`
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
      border: 1px solid ${(props) => props.theme.colorBorder};
      font-size: 14px;
      text-align: center;
      height: 42px;
      ${FlexRowCenter}
    }

    .content-editAccount {
      margin-top: 24px;
      font-size: 14px;
      ${FlexRowCenter};

      * {
        color: ${colorPinned};
      }
    }
  }
  .content-btn {
    background-color: ${colorPinned};
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
`;
export default Account;
