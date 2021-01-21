import * as React from 'react';

import styled, { keyframes } from 'styled-components';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

import { useSidebarContext } from '../../context/SidebarContext';

const ToggleSidebar = () => {
  const sidebarData = useSidebarContext();

  const onClick = () => {
    sidebarData.setSidebar(!sidebarData.state);
  };
  return (
    <Button onClick={onClick} hide={sidebarData.state}>
      <VerticalAlignBottomIcon />
    </Button>
  );
};

const Button = styled.button`
  background-color: transparent;
  width: 36px;
  height: 36px;
  margin-left: 8px;
  border: none;
  transform: ${(props) => (props.hide ? 'rotate(90deg)' : 'rotate(270deg)')};
`;

export default ToggleSidebar;
