import * as React from 'react';

import styled from 'styled-components';

import MainIcon from '../../components/MainIcon';
import CreateNote from '../../components/CreateNote';

const Header = ({ allNotes, trash, tagName }) => {
  return (
    <Div>
      <MainIcon />
      <h1>
        {allNotes && !tagName && 'All Notes'}
        {trash && !tagName && 'Trash'}
        {tagName && allNotes && `Notes with tag '${tagName}'`}
        {tagName && trash && `Notes with tag '${tagName}'`}
      </h1>
      <CreateNote />
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
  border-bottom: 1px solid #c3c4c7;

  > h1 {
    font-weight: 500;
    font-size: 18px;
    color: #2c3338;
  }

  * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Header;
