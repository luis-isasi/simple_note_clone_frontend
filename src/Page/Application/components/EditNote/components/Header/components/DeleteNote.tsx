import * as React from 'react';

import styled from 'styled-components';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useMutation } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';

import { useAppContext } from 'ContextApp/AppContext';
import DELETE_NOTE from 'GraphqlApp/DeleteNote.graphql';

import { HoverText } from 'StylesApp';

const DeleteNote = ({ setEditNote }) => {
  const { selectedNote } = useAppContext();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 766px)' });

  const [deleteNote, { loading }] = useMutation(DELETE_NOTE, {
    update(cache, { data: { deleteNote } }) {
      cache.modify({
        // id: cache.identify(deleteNote),
        fields: {
          notes(existingNotes, { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  const onClick = () => {
    deleteNote({ variables: { id: selectedNote.id } });
    if (isTabletOrMobile) {
      setEditNote(false);
    }
  };

  return (
    <Button onClick={onClick} disabled={loading}>
      <DeleteForeverOutlinedIcon style={{ fontSize: 28 }} />
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
