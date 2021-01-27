import * as React from 'react';

import NotesIcon from '@material-ui/icons/Notes';
import styled from 'styled-components';

import { colorIcon } from 'StylesApp';
import { BtnsMain } from './Styled';

const AllNotes = () => {
  return (
    <Button>
      <NotesIcon />
      All Notes
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

export default AllNotes;
