import * as React from 'react';

import styled, { keyframes } from 'styled-components';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import { useQuery, gql } from '@apollo/client';

import { useNoteContext } from 'Context/NoteContext';

const NOTES = gql`
  query GetNotes {
    notes {
      id
      text
      user {
        id
        email
      }
    }
  }
`;

const ListNotes = () => {
  const noteData = useNoteContext();

  const { loading, error, data } = useQuery(NOTES);

  // console.log(noteData.note);

  const selectNote = (note) => {
    noteData.selectNote(note);
  };

  const renderNotes = () => {
    return data.notes.map((note) => {
      return (
        <BtnNote
          key={note.id}
          onClick={() => {
            selectNote(note);
          }}
        >
          {note.text}
        </BtnNote>
      );
    });
  };

  if (loading) return <IconAnimation style={{ fontSize: '60px' }} />;
  if (error || !data) return <p>Estamos teniendo problemas con el servidor</p>;
  return <Ul>{renderNotes()}</Ul>;
};

const Ul = styled.ul`
  background-color: gray;
`;

const BtnNote = styled.button`
  cursor: pointer;
  border: none;
  height: 50px;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid black;
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
  font-size: 400px;
  margin: auto;
  animation: ${rotate} 0.85s linear infinite;
`;

export default ListNotes;
