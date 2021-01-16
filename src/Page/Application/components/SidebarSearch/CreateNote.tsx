import * as React from 'react';

import styled from 'styled-components';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import { colorIcon } from '../../StylesApp';

const CreateNote = () => {
  return (
    <BtnNewNote>
      <NoteAddIcon />
    </BtnNewNote>
  );
};

const BtnNewNote = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  ${colorIcon}
`;
export default CreateNote;
