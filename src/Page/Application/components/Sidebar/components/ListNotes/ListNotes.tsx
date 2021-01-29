import * as React from 'react';

import styled from 'styled-components';

import CreateNote from '../Header/components/CreateNote';
import { IconAnimation, Error } from 'StylesApp';

const ListNotes = ({
  loading,
  error,
  listNotes,
  note,
  selectNote,
  searchGraphqlVariable,
  onClickClear,
}) => {
  const noteSelectedId = note ? note.id : '';

  const renderNotes = () => {
    if (searchGraphqlVariable && !listNotes.length) {
      return (
        <DivNoNotes>
          <NoNotes>No Results</NoNotes>
          <CreateNote
            hover={false}
            searchGraphqlVariable={searchGraphqlVariable}
            onClickClear={onClickClear}
          >
            {`Create a new note with "${searchGraphqlVariable}"`}
          </CreateNote>
        </DivNoNotes>
      );
    }
    //si no hay Notas a renderizar le avisamos y le damos la opcion de crear una
    if (!listNotes.length) {
      return (
        <DivNoNotes>
          <NoNotes>No Notes</NoNotes>
          <CreateNote hover={false}>Create a new note</CreateNote>
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
        selected={note.id === noteSelectedId}
      >
        <div>
          <p>{note.text || <NewNote>New Note...</NewNote>}</p>
        </div>
      </BtnNote>
    ));
  };

  const handledListNotes = () => {
    if (loading) {
      return <IconAnimation style={{ fontSize: '60px' }} />;
    }
    if (error) {
      return (
        <Error> Hay un Error en nuestro servidor, intentalo mas tarde </Error>
      );
    }
    return renderNotes();
  };

  return <Ul>{handledListNotes()}</Ul>;
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

const NewNote = styled.strong`
  color: #918f90;
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
