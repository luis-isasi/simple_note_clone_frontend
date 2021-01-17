import * as React from 'react';

import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import debounce from 'lodash/debounce';

import { useNoteContext } from 'Page/Application/context/NoteContext';
import UPDATE_NOTE from '../../graphql/updateNote.graphql';

const Note = () => {
  const noteData = useNoteContext();
  const [value, setValue] = React.useState(
    noteData.note ? noteData.note.text : ''
  );

  const [updateNote] = useMutation(UPDATE_NOTE);

  React.useEffect(() => {
    if (noteData.note) {
      setValue(noteData.note.text);
    }
  }, [noteData.note]);

  const onUpdateNodeDebounce = React.useCallback(
    debounce((id: string, text: string) => {
      updateNote({
        variables: {
          id,
          text,
        },
      });
    }, 500),
    []
  );

  const onChange = (e) => {
    const {
      target: { value: _value },
    } = e;
    setValue(_value);
    onUpdateNodeDebounce(noteData.note.id, _value);
  };

  return (
    <Div>
      {value ? (
        <TextArea onChange={onChange} value={value}></TextArea>
      ) : (
          <P>Selecciona una nota para comenzar a editar 📝</P>
        )}
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  font-family: inherit;
  font-size: 22px;
  font-weight: 300;
`;

const TextArea = styled.textarea`
  width: 80%;
  max-width: 1200px;
  height: 90%;
  border: none;
  resize: none;
  /* margin-top: 50px; */
  font-size: 18px;
  font-weight: 300;
  font-family: inherit;

  &:focus {
    border: 1px solid white;
  }
`;

export default Note;
