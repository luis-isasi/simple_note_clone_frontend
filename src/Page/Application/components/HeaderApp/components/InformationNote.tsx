import * as React from 'react';

import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';

import { HoverText } from 'StylesApp';
import { useAppContext } from 'ContextApp/AppContext';

const InformationNote = () => {
  const AppData = useAppContext();

  const onClick = () => {
    //mostrando info de la Note seleccionada
    AppData.setInfo(true);
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
