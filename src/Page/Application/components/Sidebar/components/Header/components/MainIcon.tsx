import * as React from 'react';

import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import { Shortcuts } from 'shortcuts';

import { HoverText, colorIcon } from 'StylesApp';
import { useAppContext } from 'ContextApp/AppContext';

const Main = () => {
  const { showMain, main } = useAppContext();
  const shortcuts = new Shortcuts();

  React.useEffect(() => {
    shortcuts.add({
      shortcut: 'Ctrl+Shift+U',
      handler: () => {
        onClick();
      },
    });
    return () => {
      shortcuts.remove({ shortcut: 'Ctrl+Shift+U' });
    };
  }, [main]);

  const onClick = () => {
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
