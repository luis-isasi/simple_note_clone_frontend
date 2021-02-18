import * as React from 'react';

import styled from 'styled-components';

import MainIcon from './MainIcon';
import CreateNote from './CreateNote';

const Header = ({ allNotes, trash, tagName, setAddingNewNote }) => {
  return (
    <Div>
      <MainIcon />
      <h3>
        {allNotes && !tagName && 'All Notes'}
        {trash && !tagName && 'Trash'}
        {tagName && allNotes && 'Notes with  Selected Tag'}
        {tagName && trash && `Notes with tag '${tagName}'`}
      </h3>
      <CreateNote setAddingNewNote={setAddingNewNote} />
    </Div>
  );
};

const Div = styled.div`
  box-sizing: border-box;
  min-height: 56px;
  padding: 0px 12px;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colorBorder};

  * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > h3 {
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: ${(props) => props.theme.colorText};
  }
`;

export default Header;
