import * as React from 'react';

import NotesIcon from '@material-ui/icons/Notes';

import { Button, Div } from './Styled';

const AllNotes = ({
  isAllNotes,
  setIsAllNotes,
  setIsTrash,
  setSearchTag,
  showMain,
}) => {
  const onClick = () => {
    setIsTrash(false);
    setSearchTag({
      id: null,
      name: undefined,
    });
    setIsAllNotes(true);
    //close Main
    showMain(false);
  };
  return (
    <Button select={isAllNotes} onClick={onClick}>
      <Div select={isAllNotes}>
        <span>
          <NotesIcon />
        </span>
        <p>All Notes</p>
      </Div>
    </Button>
  );
};

export default AllNotes;
