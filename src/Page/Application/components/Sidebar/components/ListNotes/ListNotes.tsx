import * as React from 'react';

import { useMutation, useApolloClient } from '@apollo/client';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { Shortcuts } from 'shortcuts';
import { useMediaQuery } from 'react-responsive';

import CreateNote from '../../components/Header/components/CreateNote';
import EMPTY_TRASH from 'GraphqlApp/EmptyTrash.graphql';
import GET_NOTES from 'GraphqlApp/GetNotes.graphql';
import { IconAnimation } from 'StylesApp';

import {
  BtnEmptyTrash,
  BtnNote,
  ContentListNotes,
  DivNoNotes,
  NewNote,
  NoNotes,
  Ul,
} from './styled';

const ListNotes = ({
  filterNotes: { listNotes, lengthPinned },
  selectedNote,
  selectNote,
  searchGraphqlVariable,
  onClickClear,
  trash,
  allNotes,
  setEditNote,
  switchPinned,
  setSwitchPinned,
  loadingUpdateTextNote,
}) => {
  const noteSelectedId = selectedNote ? selectedNote.id : '';
  const indexNote = React.useRef(0);
  const listNoteLength = React.useRef(listNotes.length);

  const shortcuts = new Shortcuts();
  const client = useApolloClient();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 767px)',
  });

  const [emptyTrash] = useMutation(EMPTY_TRASH, {
    update(cache) {
      // cache.modify({
      //   fields: {
      //     'notes({"find":{"where":{"tagId":null,"text":{"contains":""}}},"isInTrash":true})': (
      //       existingNotes = []
      //     ) => {
      //       return [];
      //     },
      //   },
      // });
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
    if (isDesktopOrLaptop) {
      //ADDING SHORTCUTS
      shortcuts.add([
        {
          shortcut: 'Ctrl+Shift+J',
          handler: (e) => {
            e.preventDefault();
            //PREVIOUS NOTE
            let index = indexNote.current;
            //SI NO ES LA PRIMERA NOTA SELECCIONAMOS LA ANTERIOR
            if (!(index === 0)) {
              indexNote.current = indexNote.current - 1;
              selectNote(listNotes[indexNote.current]);
            }
          },
        },
        {
          shortcut: 'Ctrl+Shift+K',
          handler: (e) => {
            e.preventDefault();
            //NEXT NOTE
            let index = indexNote.current + 1;
            //SI NO ES LA ULTIMA NOTA SELECCIONAMOS LA SIGUIENTE
            if (!(index === listNoteLength.current)) {
              indexNote.current = indexNote.current + 1;
              selectNote(listNotes[indexNote.current]);
            }
          },
        },
      ]);
    }
    return () => {
      if (isDesktopOrLaptop) {
        shortcuts.remove([
          { shortcut: 'Ctrl+Shift+J' },
          { shortcut: 'Ctrl+Shift+K' },
        ]);
      }
    };
  }, [listNotes, trash, allNotes]);

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

  React.useEffect(() => {
    if (isDesktopOrLaptop) {
      indexNote.current = 0;
    }
  }, [trash, allNotes, searchGraphqlVariable]);

  React.useEffect(() => {
    if (selectedNote && listNotes.length > 0) {
      if (
        isDesktopOrLaptop &&
        listNotes[indexNote.current].id !== selectedNote.id
      ) {
        if (switchPinned) {
          setSwitchPinned(false);
        } else {
          selectNote(listNotes[indexNote.current]);
        }
      }
    } else {
      selectNote(listNotes[indexNote.current]);
    }
  }, [listNotes, selectedNote]);

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
    const onClickNote = (_note, index) => () => {
      //AGREGAMOS EL FOCUS CUANDO SE HAGA UNA BUSQUEDA Y SE DE CLICK EN UNA NOTA
      const textAreaNote = document.getElementById('textNote');
      if (textAreaNote) textAreaNote.focus();

      if (!isDesktopOrLaptop) {
        setEditNote(true);
      }
      indexNote.current = index;
      selectNote(_note);
    };

    //renderizamos todas las notas
    return listNotes.map((_note, index) => (
      <BtnNote
        key={_note.id}
        onClick={onClickNote(_note, index)}
        selected={_note.id === noteSelectedId}
      >
        <div className="pinned">{_note.pinned && <AttachFileIcon />}</div>
        <div className="noteText">
          <div className="animationEditNote">
            {_note.id === noteSelectedId && loadingUpdateTextNote && (
              <IconAnimation />
            )}
          </div>
          <p>
            {`${_note.id === noteSelectedId ? selectedNote.text : _note.text
              }` || <NewNote>New Note...</NewNote>}
          </p>
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

export default React.memo(ListNotes);
