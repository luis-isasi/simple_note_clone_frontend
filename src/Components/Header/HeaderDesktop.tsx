import React from 'react';

import styled, { css } from 'styled-components';
import NotesIcon from '@material-ui/icons/Notes';
import { Link } from 'react-router-dom';

import LinkLogin from './components/LinkLogin';
import LinkSignup from './components/LinkSignup';

const HeaderDesktop = () => {
  return (
    <Header>
      <div>
        <NotesIcon />
        <LinkStyle to="/">SimpleNote</LinkStyle>
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
`;

const LinkStyle = styled(Link)`
  font-weight: 400;
  font-size: 20px;
  text-decoration: none;
  color: #000000;
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
