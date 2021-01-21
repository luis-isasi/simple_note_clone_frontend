import * as React from 'react';

import styled, { css } from 'styled-components';

import ToggleSidebar from './components/ToggleSidebar';
import DeleteNote from './components/DeleteNote';
import InformationNote from './components/InformationNote';
import Share from './components/Share';
import { colorIcon } from '../../StylesApp';

const HeaderApp = (props) => {
  return (
    <Header className={props.className}>
      <ToggleSidebar />
      <DivOptions>
        <Share />
        <DeleteNote />
        <InformationNote />
      </DivOptions>
    </Header>
  );
};

const flexRowCenter = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const styleIcon = css`
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Header = styled.header.attrs((props) => ({
  className: props.className,
}))`
  background-color: #ffffff;
  ${flexRowCenter}
  justify-content: space-between;
  * {
    ${colorIcon}
  }
`;

const DivOptions = styled.div`
  ${flexRowCenter}
  width: 170px;
  height: 36px;

  * {
    ${styleIcon}
    ${flexRowCenter}
  }
`;
export default HeaderApp;
