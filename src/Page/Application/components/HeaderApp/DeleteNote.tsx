import * as React from 'react';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useMutation } from '@apollo/client';

import { useNoteContext } from '../../context/NoteContext';
import DELETE_NOTE from '../../graphql/DeleteNote.graphql';

const DeleteNote = () => {
  const noteData = useNoteContext();

  const [deleteNote] = useMutation(DELETE_NOTE);

  // console.log(noteData.note);
  const onClick = () => {
    deleteNote({ variables: { id: noteData.note.id } });
  };
  return (
    <button onClick={onClick}>
      <DeleteForeverIcon />
    </button>
  );
};

export default DeleteNote;
