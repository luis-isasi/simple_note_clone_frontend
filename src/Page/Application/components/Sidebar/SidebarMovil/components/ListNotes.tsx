import * as React from 'react';

import styled from 'styled-components';
import { useMutation, useApolloClient } from '@apollo/client';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import CreateNote from '../../components/CreateNote';
import {
  colorBorder,
  colorPinned,
  colorText,
  colorTextNote,
  scrollbarStyle,
  backgroundHoverNote,
  backgroundSelectNote,
} from 'StylesApp';
import EMPTY_TRASH from 'GraphqlApp/EmptyTrash.graphql';
import GET_NOTES from 'GraphqlApp/GetNotes.graphql';

const ListNotesMovil = ({
  filterNotes: { listNotes, lengthPinned },
  note,
  selectNote,
  searchGraphqlVariable,
  onClickClear,
  trash,
  allNotes,
  setEditNote,
}) => {
  const noteSelectedId = note ? note.id : '';
  const indexNote = React.useRef(0);
  const listNoteLength = React.useRef(listNotes.length);

  const client = useApolloClient();

  const [emptyTrash] = useMutation(EMPTY_TRASH, {
    update(cache) {
      client.writeQuery({
        query: GET_NOTES,
        variables: {
          tagId: null,
          text: '',
          isInTrash: true,
        },
        data: {
          notes: [],
        },
      });
    },
  });

  React.useEffect(() => {
    indexNote.current = 0;
  }, [trash, allNotes]);

  React.useEffect(() => {
    const currentNotesLength = listNoteLength.current;
    const newNotesLength = listNotes.length;

    //DELETE  NOTE
    if (newNotesLength === currentNotesLength - 1) {
      listNoteLength.current = newNotesLength;
      let index = indexNote.current;

      if (newNotesLength === index) {
        selectNote(listNotes[indexNote.current - 1]);
        indexNote.current = index - 1;
      } else {
        selectNote(listNotes[indexNote.current]);
      }
    }

    //ADDING NEW NOTE
    if (newNotesLength === currentNotesLength + 1) {
      listNoteLength.current = newNotesLength;
      indexNote.current = lengthPinned;
      selectNote(listNotes[indexNote.current]);
    }

    //guardamos el length del nuevo listNotes
    listNoteLength.current = listNotes.length;
  }, [listNotes]);

  const onClickNote = (_note, index) => () => {
    setEditNote(true);
    indexNote.current = index;
    selectNote(_note);
  };

  const renderNotes = () => {
    //SE REALIZO UNA BUSQUEDAD PERO NO HAY RESULTADOS, DAMOS LA OPCION DE CREAR UNO CON EL VALUE SEARCH
    if (searchGraphqlVariable && !listNotes.length) {
      return (
        <DivNoNotes>
          <div>
            <NoNotes>No Results</NoNotes>
            <CreateNote
              hover={false}
              searchGraphqlVariable={searchGraphqlVariable}
              onClickClear={onClickClear}
            >
              <p>{`Create a new note with "${searchGraphqlVariable}"`}</p>
            </CreateNote>
          </div>
        </DivNoNotes>
      );
    }

    //si no hay Notas a renderizar le avisamos y le damos la opcion de crear una
    if (!listNotes.length) {
      return (
        <DivNoNotes>
          <div>
            <NoNotes>No Notes</NoNotes>
            <CreateNote hover={false}>
              <p>Create a new note</p>
            </CreateNote>
          </div>
        </DivNoNotes>
      );
    }

    //renderizamos todas las notas
    return listNotes.map((_note, index) => (
      <BtnNote
        key={_note.id}
        onClick={onClickNote(_note, index)}
        selected={_note.id === noteSelectedId}
      >
        <div className="pinned">{_note.pinned && <AttachFileIcon />}</div>
        <div className="noteText">
          <p>{_note.text || <NewNote>New Note...</NewNote>}</p>
        </div>
      </BtnNote>
    ));
  };

  return (
    <ContentListNotes>
      <Ul>{renderNotes()}</Ul>
      {trash && listNotes.length && (
        <BtnEmptyTrash onClick={emptyTrash}>Empty Trash</BtnEmptyTrash>
      )}
    </ContentListNotes>
  );
};

//----------Styles----------

const ContentListNotes = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Ul = styled.ul`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-flow: column;
  overflow-y: auto;

  ${scrollbarStyle}
`;

const BtnNote = styled.button`
  background-color: ${(props) =>
    props.selected ? `${backgroundSelectNote} !important` : 'transparent'};
  cursor: pointer;
  border: none;
  height: 64px;
  width: 100%;
  padding: 0px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: flex-start;

  &:hover {
    background-color: ${(props) =>
    props.selected ? null : `${backgroundHoverNote}`};
  }

  .pinned {
    background-color: transparent;
    min-width: 24px;
    height: 100%;
    color: ${colorPinned};
    margin-top: 4px;
    margin-left: 4px;

    > * {
      transform: rotate(45deg);
      font-size: 18px;
      background-color: transparent;
    }
  }

  .noteText {
    background-color: transparent;
    box-sizing: border-box;
    background-color: transparent !important;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-grow: 1;
    overflow: hidden;
    border-bottom: 1px solid ${colorBorder};

    > p {
      background-color: transparent;
      width: 100%;
      font-family: inherit;
      font-size: 14px;
      font-weight: bold;
      color: ${colorTextNote};
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;

const NewNote = styled.p`
  background-color: transparent !important;
  color: #918f90;
`;

const DivNoNotes = styled.div`
  margin: auto;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  & {
    color: ${colorText};
  }

  > div {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
`;

const NoNotes = styled.p`
  font-family: inherit;
  font-size: 22px;
  font-weight: 300;
  margin: 8px 0px;
`;

const BtnEmptyTrash = styled.button`
  background-color: transparent;
  position: relative;
  bottom: 0px;
  min-height: 58px;
  width: 100%;
  color: #e65054;
  border: none;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  border-top: 1px solid ${colorBorder};
`;

export default React.memo(ListNotesMovil);
