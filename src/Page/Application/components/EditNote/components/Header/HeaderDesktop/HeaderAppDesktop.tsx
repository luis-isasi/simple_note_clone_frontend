import * as React from 'react';

import styled, { css } from 'styled-components';
import { useMutation } from '@apollo/client';

import { useAppContext } from 'ContextApp/AppContext';

import { colorIcon } from 'StylesApp';
import RESTORE_NOTE from 'GraphqlApp/RestoreNote.graphql';
import DELETED_NOTE_FOREVER from 'GraphqlApp/DeletedNoteForever.graphql';
import ShowMarkdown from '../components/ShowMarkdown';
import ToggleSidebar from '../components/ToggleSidebar';
import DeleteNote from '../components/DeleteNote';
import InformationNote from '../components/InfoNoteIcon';
import Share from '../components/Share';

const HeaderApp = ({ showMarkdown, setShowMakdown, allNotes, note, trash }) => {
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
              {note.isMarkdown && (
                <ShowMarkdown
                  showMarkdown={showMarkdown}
                  setShowMakdown={setShowMakdown}
                />
              )}
              <Share />
              <DeleteNote />
              <InformationNote />
            </DivOptions>
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

//----------------STYLED--------------
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
  min-height: 55px;
  border-bottom: 1px solid ${(props) => props.theme.colorBorder};

  * {
    color: ${colorIcon};
  }
`;

const DivOptions = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  width: auto;

  > * {
    ${styleIcon}
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
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
