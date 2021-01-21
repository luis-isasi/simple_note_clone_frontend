import * as React from 'react';

import styled, { keyframes } from 'styled-components';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import { useNoteContext } from 'Page/Application/context/NoteContext';

const ListNotes = () => {
  const noteData = useNoteContext();
  const idNoteSelected = noteData.note ? noteData.note.id : '';

  const selectNote = (note) => {
    noteData.selectNote(note);
  };

  const renderNotes = () => {
    return noteData.listNotes.map((note) => {
      return (
        <BtnNote
          key={note.id}
          onClick={() => {
            selectNote(note);
          }}
          selected={note.id === idNoteSelected ? true : false}
        >
          <p>{note.text || <NewNote>New Note...</NewNote>}</p>
        </BtnNote>
      );
    });
  };

  if (!noteData.listNotes) {
    return (
      <Ul>
        <IconAnimation style={{ fontSize: '60px' }} />
      </Ul>
    );
  }

  return <Ul>{renderNotes()}</Ul>;
};

//----------Styles----------
const Ul = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
`;

const BtnNote = styled.button`
  cursor: pointer;
  border: none;
  height: 64px;
  width: 100%;
  padding: 0px;
  background-color: ${(props) => (props.selected ? '#cfddfd' : 'transparent')};
  display: flex;
  flex-flow: column;
  align-items: flex-end;

  p {
    height: 100%;
    width: 90%;
    font-family: inherit;
    font-size: 16px;
    font-weight: 300;
    text-align: left;
    line-height: 64px;
    border-bottom: 1px solid #c3c4c7;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

const IconAnimation = styled(AutorenewIcon)`
  margin: auto;
  animation: ${rotate} 0.85s linear infinite;
`;

const NewNote = styled.strong`
  color: #918f90;
`;
export default ListNotes;
