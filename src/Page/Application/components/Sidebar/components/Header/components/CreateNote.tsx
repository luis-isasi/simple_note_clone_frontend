import * as React from 'react';

import styled, { css } from 'styled-components';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { useMutation } from '@apollo/client';

import CREATE_NOTE from 'GraphqlApp/CreateNote.graphql';
import NOTE_FRAGMENT from 'GraphqlApp/NoteFragment.graphql';
import { colorIcon } from '../../../../../StylesApp';
import { HoverText } from 'StylesApp';
import { useAppContext } from 'ContextApp/AppContext';

const CreateNote = ({
  children,
  hover,
  searchGraphqlVariable,
  onClickClear,
}) => {
  const dataApp = useAppContext();

  const [createNote, { data: _dataMutation }] = useMutation(CREATE_NOTE, {
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
      dataApp.setNote(createNote);
      onClickClear();
    },
    // refetchQueries: [
    //   {
    //     query: GET_NOTES,
    //     variables: {
    //       text: '',
    //     },
    //   },
    // ],
  });

  // React.useEffect(() => {
  //   if (_dataMutation) {
  //     console.log('seteando la list desde effect CreateNote');
  //     dataApp.addNote(_dataMutation.createNote);
  //     dataApp.selectNote(_dataMutation.createNote);
  //   }
  // }, [_dataMutation]);

  const onClick = () => {
    let _text = searchGraphqlVariable || '';
    createNote({
      variables: {
        text: _text,
      },
    }).then((response) => {
      // const { notes } = apolloClient.readQuery({
      //   query: GET_NOTES,
      //   variables: {
      //     text: '',
      //   },
      // });
      // apolloClient.writeQuery({
      //   query: GET_NOTES,
      //   variables: {
      //     text: '',
      //   },
      //   data: {
      //     notes: [...notes, newNote],
      //   },
      // });
      // dataApp.selectNote(newNote);
    });
  };
  return (
    <BtnNewNote onClick={onClick} hover={hover}>
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
  ${colorIcon}

  ${(props) => (props.hover === undefined ? hover : null)};
`;

export default React.memo(CreateNote);
