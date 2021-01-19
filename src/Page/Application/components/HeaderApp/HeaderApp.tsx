import * as React from 'react';

import styled, { css } from 'styled-components';

import ToggleSidebar from './ToggleSidebar';
import DeleteNote from './DeleteNote';
import InformationNote from './InformationNote';
import Share from './Share';
import { colorIcon } from '../../StylesApp';

const HeaderApp = () => {
  return (
    <Header>
      <DivLeft>
        <ToggleSidebar />
      </DivLeft>
      <DivRight>
        <Share />
        <DeleteNote />
        <InformationNote />
      </DivRight>
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

const Header = styled.header`
  background-color: #ffffff;
  ${flexRowCenter}
  justify-content: space-between;

  * {
    ${colorIcon}
  }
`;

const DivLeft = styled.div`
  ${flexRowCenter}
  width: 36px;
  height: 36px;
  margin-left: 16px;
  transform: rotate(90deg);

  * {
    ${styleIcon};
    ${flexRowCenter};
  }
`;

const DivRight = styled.div`
  ${flexRowCenter}
  width: 170px;
  height: 36px;

  * {
    ${styleIcon}
    ${flexRowCenter}
  }
`;
export default HeaderApp;
