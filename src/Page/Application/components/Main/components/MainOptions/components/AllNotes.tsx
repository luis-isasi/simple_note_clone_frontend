import * as React from 'react';

import NotesIcon from '@material-ui/icons/Notes';

import { colorIcon } from 'StylesApp';
import { Button, Div } from './Styled';

const AllNotes = ({ allNotes, setAllNotes, setTrash, setSearchTag }) => {
  const onClick = () => {
    setTrash(false);
    setSearchTag({
      id: null,
      name: undefined,
    });
    setAllNotes(true);
  };
  return (
    <Button select={allNotes} onClick={onClick}>
      <Div select={allNotes}>
        <NotesIcon style={{ color: `${colorIcon}` }} />
        All Notes
      </Div>
    </Button>
  );
};

export default AllNotes;
