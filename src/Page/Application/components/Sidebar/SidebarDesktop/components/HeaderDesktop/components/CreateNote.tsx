import * as React from 'react';

import styled, { css } from 'styled-components';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { useMutation } from '@apollo/client';
// import hotkeys from 'hotkeys-js';
import { Shortcuts } from 'shortcuts';

import CREATE_NOTE from 'GraphqlApp/CreateNote.graphql';
import NOTE_FRAGMENT from 'GraphqlApp/NoteFragment.graphql';
import { HoverText, colorIcon } from 'StylesApp';
import { useAppContext } from 'ContextApp/AppContext';

const CreateNote = ({
  children,
  hover,
  searchGraphqlVariable,
  onClickClear,
}) => {
  const { selectNote, trash } = useAppContext();

  React.useEffect(() => {
    const shortcuts = new Shortcuts();
    shortcuts.add([
      // Adding some shortcuts
      {
        shortcut: 'Ctrl+Shift+L',
        handler: (e) => {
          e.preventDefault();
          onClick();
          return true;
        },
      },
    ]);
  }, []);

  //luego de hacer el mutation debemos de actualizar la cache manuelamente
  const [createNote] = useMutation(CREATE_NOTE, {
    update(cache, { data: { createNote } }) {
      cache.modify({
        fields: {
          notes(existingNotes = []) {
            const newNoteRef = cache.writeFragment({
              data: createNote,
              fragment: NOTE_FRAGMENT,
            });

            return [newNoteRef, ...existingNotes];
          },
        },
      });
      // outline: none;
      selectNote(createNote);
      if (onClickClear) onClickClear();
    },
    // refetchQueries: [
    //   {
    //     query: GET_NOTES,
    //     variables: {
    // text: '',
    //     },
    //   },
    // ],
  });

  const onClick = () => {
    let _text = searchGraphqlVariable || '';
    createNote({
      variables: {
        text: _text,
      },
    });
  };

  return (
    <BtnNewNote onClick={onClick} hover={hover} disabled={trash}>
      {children || <NoteAddIcon />}
    </BtnNewNote>
  );
};

const hover = css`
  &:hover {
    &:before {
      content: 'New Note';
      ${HoverText};
    }
  }
`;

const BtnNewNote = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colorIcon};

  &:disabled {
    opacity: 0.4;
  }
  ${(props) => (props.hover === undefined ? hover : null)};
`;

export default React.memo(CreateNote);
