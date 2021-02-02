import * as React from 'react';

import styled, { css } from 'styled-components';

import { useAppContext } from 'ContextApp/AppContext';
import ToggleSidebar from './components/ToggleSidebar';
import DeleteNote from './components/DeleteNote';
import InformationNote from './components/InfoNoteIcon';
import Share from './components/Share';
import { colorIcon } from 'StylesApp';

const HeaderApp = (props) => {
  const { note, allNotes, trash } = useAppContext();

  return (
    <Header className={props.className} allNotes={allNotes}>
      {allNotes && (
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
          <button className="btnDelete">Delete Forever</button>
          <button className="btnRestore">Restore Note</button>
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

const Header = styled.header.attrs((props) => ({
  className: props.className,
}))`
  ${(props) => (props.allNotes ? `${flexRowCenterBetween}` : `${flexRowEnd}`)}
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
