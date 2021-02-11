import * as React from 'react';

import styled, { css } from 'styled-components';
import { useMutation } from '@apollo/client';

import { useAppContext } from 'ContextApp/AppContext';
import { colorIcon } from 'StylesApp';
import RESTORE_NOTE from 'GraphqlApp/RestoreNote.graphql';
import DELETED_NOTE_FOREVER from 'GraphqlApp/DeletedNoteForever.graphql';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ShowMarkdown from '../components/ShowMarkdown';
import DeleteNote from '../components/DeleteNote';
import InformationNote from '../components/InfoNoteIcon';
import Share from '../components/Share';

const HeaderApp = ({
  showMarkdown,
  setShowMakdown,
  allNotes,
  note,
  trash,
  setEditNote,
}) => {
  const {
    searchTag: { name },
  } = useAppContext();

  const [restoreNote] = useMutation(RESTORE_NOTE, {
    update(cache) {
      cache.modify({
        fields: {
          notes(existingNotes = [], { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  const [deleteForevereNote] = useMutation(DELETED_NOTE_FOREVER, {
    update(cache) {
      cache.modify({
        fields: {
          notes(existingNotes = [], { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  const handlerBtnDeleteForever = () => {
    deleteForevereNote({ variables: { id: note.id } });
    setEditNote(false);
  };

  const handlerBtnRestore = () => {
    restoreNote({ variables: { id: note.id } });
    //------------
    setEditNote(false);
    //------------
  };

  const onClick = () => {
    setEditNote(false);
  };

  return (
    <Header>
      <button className="btnBack" onClick={onClick}>
        <ArrowBackOutlinedIcon />
      </button>
      {(allNotes || name) && (
        <>
          {note && (
            <>
              {note.isMarkdown && (
                <ShowMarkdown
                  showMarkdown={showMarkdown}
                  setShowMakdown={setShowMakdown}
                />
              )}
              <Share />
              <DeleteNote setEditNote={setEditNote} />
              <InformationNote />
            </>
          )}
        </>
      )}
      {trash && note && (
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

const Header = styled.header`
  ${flexRowCenterBetween}
  background-color: #ffffff;
  box-sizing: border-box;
  width: 100%;
  padding: 0px 16px;
  flex-basis: 56px;
  min-height: 56px;
  border-bottom: 1px solid #d6d4d4;

  > .btnBack {
    background-color: transparent;
    border: none;
  }

  > * {
    ${styleIcon}
    display: flex;
    justify-content: center;
    align-items: center;
  }

  * {
    color: ${colorIcon};
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
