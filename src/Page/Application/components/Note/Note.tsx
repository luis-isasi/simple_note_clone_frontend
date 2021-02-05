import * as React from 'react';

import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import debounce from 'lodash/debounce';

import { useAppContext } from 'ContextApp/AppContext';
import UPDATE_NOTE from 'GraphqlApp/UpdateNote.graphql';
import AddTag from './components/AddTag';
import SimpleNoteBlack from 'Images/simplenNoteBlack-logo.png';

const Note = () => {
  const appData = useAppContext();
  const [value, setValue] = React.useState(
    appData.note ? appData.note.text : ''
  );
  const [updateNote] = useMutation(UPDATE_NOTE);

  React.useEffect(() => {
    if (appData.note) {
      setValue(appData.note.text);
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
    <Div>
      {appData.note ? (
        <>
          <TextArea
            id="textNote"
            onChange={onChange}
            value={value}
            autoFocus
          ></TextArea>
          {appData.allNotes && <AddTag />}
        </>
      ) : (
        <DivLogo>
          <img src={SimpleNoteBlack} alt="SimpleNoteBlack" />
        </DivLogo>
      )}
    </Div>
  );
};

//--------------styled-----------------

const Div = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TextArea = styled.textarea.attrs((props) => ({
  id: props.id,
}))`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 60px 12%;
  border: none;
  resize: none;
  font-size: 18px;
  font-weight: 300;
  font-family: inherit;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    /* -webkit-appearance: none; */
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c2c1c1;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }
`;

const DivLogo = styled.div`
  padding: 14px;
  font-family: inherit;
  font-size: 22px;
  font-weight: 300;
  text-align: center;
  margin: auto;
  height: 100px;
  width: 100px;

  > * {
    opacity: 0.25;
    height: 100%;
    width: 100%;
  }
`;

export default React.memo(Note);
