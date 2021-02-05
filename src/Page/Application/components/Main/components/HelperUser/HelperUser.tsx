import * as React from 'react';

import styled, { css } from 'styled-components';

import Connection from './components/Connection';
import Shortcuts from './components/Shortcuts';
import HelpSupport from './components/HelpSupport';
import About from './components/About';

const HelperUser = ({ setShortcutsModal }) => {
  return (
    <Div>
      <Connection />
      <Shortcuts setShortcutsModal={setShortcutsModal} />
      <Content>
        <HelpSupport />
        <About />
      </Content>
    </Div>
  );
};

//-------------styled----------
const StyledBtnA = css`
  background-color: transparent;
  border: none;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
`;
const Div = styled.div`
  flex-basis: 152px;
  min-height: 152px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  > * {
    margin-left: 12px;
  }

  * {
    color: #646970;
    font-family: inherit;
    font-weight: normal;
    font-size: 13px;
  }
  button {
    ${StyledBtnA}
  }
  a {
    ${StyledBtnA}
    text-decoration: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;

  > * {
    margin-right: 12px;
  }
`;

export default HelperUser;
