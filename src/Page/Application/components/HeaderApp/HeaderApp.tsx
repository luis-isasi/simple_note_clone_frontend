import * as React from 'react';

import styled, { css } from 'styled-components';

import { useAppContext } from 'ContextApp/AppContext';
import ToggleSidebar from './components/ToggleSidebar';
import DeleteNote from './components/DeleteNote';
import InformationNote from './components/InfoNoteIcon';
import Share from './components/Share';
import { colorIcon } from 'StylesApp';

const HeaderApp = (props) => {
  const { note } = useAppContext();

  return (
    <Header className={props.className}>
      <ToggleSidebar />
      {note && (
        <DivOptions>
          <Share />
          <DeleteNote />
          <InformationNote />
        </DivOptions>
      )}
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
  ${flexRowCenter}
  background-color: #ffffff;
  justify-content: space-between;
  flex-basis: 55px;
  border-bottom: 1px solid #d6d4d4;
  * {
    color: ${colorIcon};
  }
`;

const DivOptions = styled.div`
  ${flexRowCenter}
  width: 170px;

  * {
    ${styleIcon}
    ${flexRowCenter}
  }
`;
export default HeaderApp;
