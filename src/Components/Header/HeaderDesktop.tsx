import React from 'react';

import styled, { css } from 'styled-components';

import NotesIcon from '@material-ui/icons/Notes';

import LinkLogin from './components/LinkLogin';
import LinkSignup from './components/LinkSignup';

const HeaderDesktop = () => {
  return (
    <Header>
      <div>
        <NotesIcon />
        <h1>SimpleNote</h1>
      </div>
      <Nav>
        <LinkLogin>Log in</LinkLogin>
        <b>|</b>
        <LinkSignup>Sign up</LinkSignup>
      </Nav>
    </Header>
  );
};

const FlexRow = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`;

const Header = styled.header`
  height: 56px;
  margin: auto;
  max-width: 1200px;
  ${FlexRow}

  div {
    width: 150px;
    ${FlexRow}
  }

  div > h1 {
    font-weight: 400;
    font-size: 20px;
  }
`;

const Nav = styled.nav`
  ${FlexRow}
  width: 150px;
  font-weight: 300;

  b {
    font-weight: 100;
    font-size: 34px;
    color: #a9adb1;
  }
`;

export default HeaderDesktop;
