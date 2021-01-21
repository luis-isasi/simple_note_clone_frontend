import * as React from 'react';

import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';

import { HoverText } from 'StylesApp';

const InformationNote = () => {
  return (
    <Button>
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
