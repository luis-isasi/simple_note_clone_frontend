import * as React from 'react';

import styled from 'styled-components';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

import { useAppContext } from 'ContextApp/AppContext';
import { HoverText } from 'StylesApp';

const ToggleSidebar = () => {
  const dataApp = useAppContext();

  const onClick = () => {
    dataApp.setSidebar(!dataApp.sidebar);
  };
  return (
    <Button onClick={onClick} hide={dataApp.sidebar} id="btnToggle">
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
  cursor: pointer;
  transform: ${(props) => (props.hide ? 'rotate(90deg)' : 'rotate(270deg)')};

  &:hover {
    &:before {
      content: 'Toggle Sidebar';
      width: 100px;
      ${HoverText}
      right: ${(props) => (props.hide ? '' : '-6px')};
      top: ${(props) => (props.hide ? '0px' : '40px')} !important;
      left: ${(props) => (props.hide ? '-6px' : '')};
      transform: ${(props) =>
    props.hide ? 'rotate(270deg)' : 'rotate(90deg)'};
    }
  }
`;

export default ToggleSidebar;
