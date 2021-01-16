import * as React from 'react';

import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import debounce from 'lodash/debounce';

import { useNoteContext } from 'Context/NoteContext';
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
      console.log('run mutation');
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
    <div>
      <h1>MY NOTE</h1>
      <TextArea onChange={onChange} value={value}></TextArea>
    </div>
  );
};

const TextArea = styled.textarea`
  width: 500px;
  height: 500px;
`;

export default Note;
