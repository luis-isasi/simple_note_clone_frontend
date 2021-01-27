import * as React from 'react';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styled from 'styled-components';

import { colorIcon } from 'StylesApp';
import { BtnsMain } from './Styled';

const Trash = () => {
  return (
    <Button>
      <DeleteForeverIcon />
      Trash
    </Button>
  );
};

const Button = styled.button`
  ${BtnsMain}
  border-bottom: 1px solid #d6d4d4;

  > :nth-child(1) {
    ${colorIcon}
  }
`;
export default Trash;
