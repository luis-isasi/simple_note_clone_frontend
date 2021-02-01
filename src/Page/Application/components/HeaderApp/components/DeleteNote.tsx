import * as React from 'react';

import styled from 'styled-components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useMutation } from '@apollo/client';

import { useAppContext } from 'ContextApp/AppContext';
import DELETE_NOTE from '../../../graphql/DeleteNote.graphql';
import { HoverText } from 'StylesApp';

const DeleteNote = () => {
  const appData = useAppContext();

  const [deleteNote] = useMutation(DELETE_NOTE, {
    update(cache, { data: { deleteNote } }) {
      cache.modify({
        // id: cache.identify(deleteNote),
        fields: {
          notes(existingNotes, { DELETE }) {
            // console.log({ existingNotes });
            return DELETE;
          },
        },
      });
    },
  });

  const onClick = () => {
    deleteNote({ variables: { id: appData.note.id } });
    appData.selectNote(undefined);
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
