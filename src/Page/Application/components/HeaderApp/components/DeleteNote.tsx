import * as React from 'react';

import styled from 'styled-components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useMutation } from '@apollo/client';

import { useNoteContext } from '../../../context/NoteContext';
import DELETE_NOTE from '../../../graphql/DeleteNote.graphql';
import { HoverText } from 'StylesApp';

const DeleteNote = () => {
  const noteData = useNoteContext();

  const [deleteNote] = useMutation(DELETE_NOTE, {
    update(cache, { data: deleteNote }) {
      cache.modify({
        fields: {
          notes(existingNotes, { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  const onClick = () => {
    deleteNote({ variables: { id: noteData.note.id } });
    noteData.selectNote(undefined);
  };
  return (
    <Button onClick={onClick}>
      <DeleteForeverIcon />
    </Button>
  );
};

// ----------------styled---------------

const Button = styled.button`
  &:hover {
    &:before {
      content: 'Trash';
      ${HoverText}
    }
  }
`;
export default DeleteNote;
