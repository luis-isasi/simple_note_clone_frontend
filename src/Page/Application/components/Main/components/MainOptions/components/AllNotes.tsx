import * as React from 'react';

import NotesIcon from '@material-ui/icons/Notes';

import { Button, Div } from './Styled';

const AllNotes = ({
  allNotes,
  setAllNotes,
  setTrash,
  setSearchTag,
  showMain,
}) => {
  const onClick = () => {
    setTrash(false);
    setSearchTag({
      id: null,
      name: undefined,
    });
    setAllNotes(true);
    //close Main
    showMain(false);
  };
  return (
    <Button select={allNotes} onClick={onClick}>
      <Div select={allNotes}>
        <span>
          <NotesIcon />
        </span>
        <p>All Notes</p>
      </Div>
    </Button>
  );
};

export default AllNotes;
