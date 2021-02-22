import * as React from 'react';

import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import { Shortcuts } from 'shortcuts';

import { HoverText, colorIcon } from 'StylesApp';
import { useAppContext } from 'ContextApp/AppContext';
import { useMediaQuery } from 'react-responsive';

const Main = () => {
  const { showMain, isOpenMain, showInfo, isOpenInfo } = useAppContext();
  const shortcuts = new Shortcuts();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 767px)',
  });

  React.useEffect(() => {
    if (isDesktopOrLaptop) {
      shortcuts.add({
        shortcut: 'Ctrl+Shift+U',
        handler: () => {
          onClick();
        },
      });
    }
    return () => {
      if (isDesktopOrLaptop) {
        shortcuts.remove({ shortcut: 'Ctrl+Shift+U' });
      }
    };
  }, [isOpenMain, isOpenInfo]);

  const onClick = () => {
    if (isOpenInfo) {
      showInfo(false);
    }

    //Mostrando Main
    showMain(!isOpenMain);
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
