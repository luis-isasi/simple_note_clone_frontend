import * as React from 'react';

import styled, { css } from 'styled-components';
import { useMutation } from '@apollo/client';

import { useAppContext } from 'ContextApp/AppContext';
import ToggleSidebar from './components/ToggleSidebar';
import DeleteNote from './components/DeleteNote';
import InformationNote from './components/InfoNoteIcon';
import Share from './components/Share';
import { colorIcon } from 'StylesApp';
import RESTORE_NOTE from 'GraphqlApp/RestoreNote.graphql';
import NOTE_FRAGMENT from 'GraphqlApp/NoteFragment.graphql';

import DELETED_NOTE_FOREVER from 'GraphqlApp/DeletedNoteForever.graphql';
// import EMPTY_TRASH from 'GraphqlApp/EmptyTrash.graphql';

const HeaderApp = () => {
  const {
    note,
    allNotes,
    trash,
    searchTag: { id, name },
  } = useAppContext();

  const [restoreNote] = useMutation(RESTORE_NOTE, {
    update(cache, { data: restoreNote }) {
      cache.modify({
        fields: {
          notes(existingNotes = []) {
            const newRefNote = cache.writeFragment({
              data: restoreNote,
              fragment: NOTE_FRAGMENT,
            });

            return [newRefNote, ...existingNotes];
          },
        },
      });
    },
  });
  // const [emptyTrash] = useMutation(EMPTY_TRASH);
  const [deleteForevereNote] = useMutation(DELETED_NOTE_FOREVER);

  const handlerBtnDeleteForever = () => {
    deleteForevereNote({ variables: { id: note.id } });
  };

  const handlerBtnRestore = () => {
    restoreNote({ variables: { id: note.id } });
  };

  return (
    <Header allNotes={allNotes} name={name}>
      {(allNotes || name) && (
        <>
          <ToggleSidebar />
          {note && (
            <DivOptions>
              <Share />
              <DeleteNote />
              <InformationNote />
            </DivOptions>
          )}
        </>
      )}
      {trash && (
        <DivTrash>
          <button className="btnDelete" onClick={handlerBtnDeleteForever}>
            Delete Forever
          </button>
          <button className="btnRestore" onClick={handlerBtnRestore}>
            Restore Note
          </button>
        </DivTrash>
      )}
    </Header>
  );
};

const flexRowCenterEvenly = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const flexRowCenterBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const styleIcon = css`
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const flexRowEnd = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Header = styled.header`
  ${(props) =>
    props.allNotes || props.name ? `${flexRowCenterBetween}` : `${flexRowEnd}`}
  background-color: #ffffff;

  flex-basis: 55px;
  border-bottom: 1px solid #d6d4d4;
  * {
    color: ${colorIcon};
  }
`;

const DivOptions = styled.div`
  ${flexRowCenterEvenly}
  width: 170px;

  * {
    ${styleIcon}
    ${flexRowCenterEvenly}
  }
`;

const DivTrash = styled.div`
  height: 100%;
  width: 260px;
  ${flexRowCenterEvenly}

  > * {
    padding: 4px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-family: inherit;
    font-weight: 500;
  }

  .btnDelete {
    color: #e65054;
    border: 2px solid #e65054;
    background-color: #ffffff;
  }

  .btnRestore {
    color: #ffffff;
    border: 2px solid #3361cc;
    background-color: #3361cc;
  }
`;

export default HeaderApp;
