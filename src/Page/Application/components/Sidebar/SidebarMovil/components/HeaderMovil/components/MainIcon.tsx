import * as React from 'react';

import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';

import { HoverText, colorIcon } from 'StylesApp';
import { useAppContext } from 'ContextApp/AppContext';

const Main = () => {
  const { showMain, main, showInfo, info } = useAppContext();

  const onClick = () => {
    if (info) {
      showInfo(false);
    }
    //Mostrando Main
    showMain(!main);
  };

  return (
    <BtnMain onClick={onClick}>
      <MenuIcon />
    </BtnMain>
  );
};

//-------------styled--------------
const BtnMain = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colorIcon};

  &:hover {
    &:before {
      content: 'Main';
      ${HoverText}
    }
  }
`;

export default React.memo(Main);
