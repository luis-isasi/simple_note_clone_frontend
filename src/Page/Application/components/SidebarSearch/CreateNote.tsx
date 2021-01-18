import * as React from 'react';

import styled from 'styled-components';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { useMutation, useQuery } from '@apollo/client';

import CREATE_NOTE from '../../graphql/CreateNote.graphql';
import GET_NOTES from '../../graphql/GetNotes.graphql';
import { colorIcon } from '../../StylesApp';

import { useNoteContext } from '../../context/NoteContext';

const CreateNote = () => {
  const noteData = useNoteContext();
  const [createNote, { data: _dataMutation }] = useMutation(CREATE_NOTE);
  // const { loading, error, data: _dataQuery } = useQuery(GET_NOTES);

  // if (_dataQuery) {
  //   console.log('actualizando la list');
  //   noteData.setListNotes(_dataQuery.notes);
  // }

  React.useEffect(() => {
    console.log('RUN USEEFFECT');
    if (_dataMutation) {
      console.log('seteando la list desde effect CreateNote');
      noteData.newNote(_dataMutation.createNote);
    }
  }, [_dataMutation]);

  const onClick = () => {
    console.log('CLICK');
    createNote({
      variables: {
        text: '',
      },
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
