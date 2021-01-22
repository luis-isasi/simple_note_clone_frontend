import * as React from 'react';

import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import debounce from 'lodash/debounce';

import { useAppContext } from 'ContextApp/AppContext';
import UPDATE_NOTE from '../../graphql/UpdateNote.graphql';

const Note = (props) => {
  const appData = useAppContext();
  const [value, setValue] = React.useState(
    appData.note ? appData.note.text : ''
  );
  const [updateNote] = useMutation(UPDATE_NOTE);

  //accedemos al textarea de Note

  React.useEffect(() => {
    if (appData.note) {
      setValue(appData.note.text);
      const textAreaNote = document.querySelector('#textNote');
      textAreaNote.focus();
    }
  }, [appData.note]);

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
    onUpdateNodeDebounce(appData.note.id, _value);
  };

  return (
    <Div className={props.className}>
      {appData.note ? (
        <TextArea
          onChange={onChange}
          value={value}
          autoFocus
          id="textNote"
        ></TextArea>
      ) : (
          <P>Selecciona una nota para comenzar a editar 📝</P>
        )}
    </Div>
  );
};

//--------------styled-----------------

const Div = styled.div.attrs((props) => ({
  className: props.className,
}))`
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

const TextArea = styled.textarea.attrs((props) => ({
  id: props.id,
}))`
  width: 80%;
  max-width: 1200px;
  height: 90%;
  border: none;
  resize: none;
  font-size: 18px;
  font-weight: 300;
  font-family: inherit;
`;

export default Note;
