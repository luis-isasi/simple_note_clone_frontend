import * as React from 'react';

import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import PIN_NOTE from 'GraphqlApp/PinNote.graphql';
import UN_PIN_NOTE from 'GraphqlApp/UnPinNote.graphql';
import UPDATE_NOTE from 'GraphqlApp/UpdateNote.graphql';
import { useAppContext } from 'ContextApp/AppContext';
import InfoNote from './components/InfoNote';
import PinNote from './components/PinNote';
import Markdown from './components/Markdown';

const Info = ({ className, id, setSwitchPinned }) => {
  const { selectedNote, showInfo, selectNote } = useAppContext();

  const [pinNote] = useMutation(PIN_NOTE);
  const [unpinNote] = useMutation(UN_PIN_NOTE);
  const [updateNote] = useMutation(UPDATE_NOTE);

  return (
    <Div className={className} id={id}>
      <InfoNote selectedNote={selectedNote} showInfo={showInfo} />
      <PinNote
        selectedNote={selectedNote}
        pinNote={pinNote}
        unpinNote={unpinNote}
        selectNote={selectNote}
        setSwitchPinned={setSwitchPinned}
      />
      <Markdown
        updateNote={updateNote}
        selectedNote={selectedNote}
        selectNote={selectNote}
      />
    </Div>
  );
};

//-------------style------------
const Div = styled.div.attrs((props) => ({
  className: props.className,
  id: props.id,
}))`
  border-left: 1px solid ${(props) => props.theme.colorBorder};
  height: 100%;
  min-width: 320px;
  max-width: 320px;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  * {
    font-family: inherit;
    font-size: 13px;
    font-weight: normal;
  }
`;
export default Info;
