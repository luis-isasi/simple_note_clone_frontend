import * as React from 'react';

import styled, { keyframes } from 'styled-components';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import CreateNote from '../Header/components/CreateNote';

const ListNotes = ({ loading, error, listNotes, note, selectNote }) => {
  const idNoteSelected = note ? note.id : '';
  const renderNotes = () => {
    //si no hay Notas a renderizar le avisamos y le damos la opcion de crear una
    if (!listNotes.length) {
      return (
        <DivNoNotes>
          <NoNotes>No Notes</NoNotes>
          <CreateNote>Create a new note</CreateNote>
        </DivNoNotes>
      );
    }

    //renderizamos todas las notas
    return listNotes.map((note) => (
      <BtnNote
        key={note.id}
        onClick={() => {
          selectNote(note);
        }}
        selected={note.id === idNoteSelected ? true : false}
      >
        <div>
          <p>{note.text || <NewNote>New Note...</NewNote>}</p>
        </div>
      </BtnNote>
    ));
  };

  return (
    <Ul>
      {loading ? (
        <IconAnimation style={{ fontSize: '60px' }} />
      ) : error ? (
        <Error> Hay un Error en nuestro servidor, intentalo mas tarde </Error>
      ) : (
            renderNotes()
          )}
    </Ul>
  );
};

//----------Styles----------
const Ul = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  overflow: auto;

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

  div {
    background-color: transparent !important;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 90%;
    border-bottom: 1px solid #c3c4c7;

    p {
      width: 100%;
      font-family: inherit;
      font-size: 16px;
      font-weight: 300;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
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

const Error = styled.p`
  font-family: inherit;
  font-size: 22px;
  font-weight: 300;
`;

const DivNoNotes = styled.div`
  margin: auto;
  height: 50px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
`;

const NoNotes = styled.p`
  font-family: inherit;
  font-size: 22px;
  font-weight: 300;
`;
export default React.memo(ListNotes);
