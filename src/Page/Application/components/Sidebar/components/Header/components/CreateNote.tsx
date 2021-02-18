import * as React from 'react';

import styled, { css } from 'styled-components';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useMutation } from '@apollo/client';
import { Shortcuts } from 'shortcuts';
import { useMediaQuery } from 'react-responsive';

import CREATE_NOTE from 'GraphqlApp/CreateNote.graphql';
import NOTE_FRAGMENT from 'GraphqlApp/NoteFragment.graphql';
import { HoverText, colorIcon, colorPinned } from 'StylesApp';
import { useAppContext } from 'ContextApp/AppContext';

const CreateNote = ({
  children,
  hover,
  searchGraphqlVariable,
  onClickClear,
  setAddingNewNote,
}) => {
  const { selectNote, trash } = useAppContext();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 767px)',
  });

  React.useEffect(() => {
    if (isDesktopOrLaptop) {
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
    }
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
    console.log({ setAddingNewNote });

    setAddingNewNote(true);
    createNote({
      variables: {
        text: _text,
      },
    });
  };

  return (
    <BtnNewNote
      onClick={onClick}
      hover={hover}
      disabled={trash}
      id="btn-new-note"
    >
      {children || <PostAddIcon />}
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

const BtnNewNote = styled.button.attrs((props) => ({
  id: props.id,
}))`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colorIcon};

  &:disabled {
    opacity: 0.4;
  }

  > p {
    color: ${colorPinned};
  }

  ${(props) => (props.hover ? hover : null)};
`;

export default React.memo(CreateNote);
