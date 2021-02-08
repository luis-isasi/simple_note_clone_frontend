import * as React from 'react';

import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import { Shortcuts } from 'shortcuts';

import { HoverText } from 'StylesApp';
import { useAppContext } from 'ContextApp/AppContext';

const InformationNote = () => {
  const { showInfo, info } = useAppContext();

  React.useEffect(() => {
    const shortcuts = new Shortcuts();
    shortcuts.add({
      shortcut: 'Ctrl+Shift+Y',
      handler: () => {
        onClick();
      },
    });
    return () => {
      shortcuts.remove({ shortcut: 'Ctrl+Shift+Y' });
    };
  }, [info]);

  const onClick = () => {
    //mostrando info de la Note seleccionada
    showInfo(!info);
  };

  return (
    <Button onClick={onClick}>
      <InfoIcon />
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
