import * as React from 'react';

import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import PIN_NOTE from 'GraphqlApp/PinNote.graphql';
import UN_PIN_NOTE from 'GraphqlApp/UnPinNote.graphql';
import { useAppContext } from 'ContextApp/AppContext';
import InfoNote from './components/InfoNote';
import PinNote from './components/PinNote';
import Markdown from './components/Markdown';

const Info = ({ className, id }) => {
  const { note, setNote } = useAppContext();

  const [pinNote] = useMutation(PIN_NOTE, {
    // update(cache, { data: { pinNote } }) {
    //   cache.modify({
    //     id: cache.identify(note),
    //     fields: {
    //       pinned() {
    //         return pinNote.pinned;
    //       },
    //     },
    //   });
    // },
  });

  const [unpinNote] = useMutation(UN_PIN_NOTE, {
    // update(cache, { data: { unpinNote } }) {
    //   cache.modify({
    //     id: cache.identify(note),
    //     fields: {
    //       pinned() {
    //         return unpinNote.pinned;
    //       },
    //     },
    //   });
    // },
  });

  return (
    <Div className={className} id={id}>
      <InfoNote />
      <PinNote
        note={note}
        pinNote={pinNote}
        unpinNote={unpinNote}
        setNote={setNote}
      />
      <Markdown />
    </Div>
  );
};

//-------------style------------
const Div = styled.div.attrs((props) => ({
  className: props.className,
  id: props.id,
}))`
  border-left: 1px solid #d6d4d4;
  height: 100%;
  min-width: 320px;
  max-width: 320px;

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
