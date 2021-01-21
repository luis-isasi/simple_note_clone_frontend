import * as React from 'react';

import styled from 'styled-components';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { useMutation, useApolloClient } from '@apollo/client';

import CREATE_NOTE from 'GraphqlApp/CreateNote.graphql';
import NOTE_FRAGMENT from 'GraphqlApp/NoteFragment.graphql';
import { colorIcon } from '../../../../../StylesApp';

import { useNoteContext } from '../../../../../context/NoteContext';

const CreateNote = () => {
  // const apolloClient = useApolloClient();
  const noteData = useNoteContext();
  const [createNote, { data: _dataMutation }] = useMutation(CREATE_NOTE, {
    update(cache, { data: { createNote } }) {
      cache.modify({
        fields: {
          notes(existingNotes = []) {
            const newNoteRef = cache.writeFragment({
              data: createNote,
              fragment: NOTE_FRAGMENT,
            });

            return [...existingNotes, newNoteRef];
          },
        },
      });
      // outline: none;
      noteData.selectNote(createNote);
    },
    // refetchQueries: [
    //   {
    //     query: GET_NOTES,
    //     variables: {
    //       text: '',
    //     },
    //   },
    // ],
  });

  // React.useEffect(() => {
  //   if (_dataMutation) {
  //     console.log('seteando la list desde effect CreateNote');
  //     noteData.addNote(_dataMutation.createNote);
  //     noteData.selectNote(_dataMutation.createNote);
  //   }
  // }, [_dataMutation]);

  const onClick = () => {
    createNote({
      variables: {
        text: '',
      },
    }).then((response) => {
      // const { notes } = apolloClient.readQuery({
      //   query: GET_NOTES,
      //   variables: {
      //     text: '',
      //   },
      // });
      // apolloClient.writeQuery({
      //   query: GET_NOTES,
      //   variables: {
      //     text: '',
      //   },
      //   data: {
      //     notes: [...notes, newNote],
      //   },
      // });
      // noteData.selectNote(newNote);
    });
  };
  return (
    <BtnNewNote onClick={onClick}>
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
