import * as React from 'react';

import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Shortcuts } from 'shortcuts';
import { useMediaQuery } from 'react-responsive';

import { HoverText } from 'StylesApp';
import { useAppContext } from 'ContextApp/AppContext';

const InformationNote = () => {
  const { showInfo, info, showMain, main } = useAppContext();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 766px)' });

  React.useEffect(() => {
    const shortcuts = new Shortcuts();
    if (!isTabletOrMobile) {
      shortcuts.add({
        shortcut: 'Ctrl+Shift+Y',
        handler: () => {
          onClick();
        },
      });
    }
    return () => {
      if (!isTabletOrMobile) {
        shortcuts.remove({ shortcut: 'Ctrl+Shift+Y' });
      }
    };
  }, [info, main]);

  const onClick = () => {
    if (main) {
      showMain(false);
    }

    //mostrando info de la Note seleccionada
    showInfo(!info);
  };

  return (
    <Button onClick={onClick}>
      <InfoOutlinedIcon />
    </Button>
  );
};
const Button = styled.button`
  &:hover {
    &:before {
      content: 'Info';
      ${HoverText};
    }
  }
`;

export default InformationNote;
