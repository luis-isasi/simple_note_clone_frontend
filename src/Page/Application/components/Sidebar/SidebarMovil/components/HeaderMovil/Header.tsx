import * as React from 'react';

import styled from 'styled-components';

import MainIcon from './components/MainIcon';
import CreateNote from './components/CreateNote';

const Header = ({ allNotes, trash, tagName }) => {
  return (
    <Div>
      <MainIcon />
      <h1>
        {allNotes && 'All Notes'}
        {trash && 'Trash'}
        {tagName && `Notes with tag '${tagName}'`}
      </h1>
      <CreateNote />
    </Div>
  );
};

const Div = styled.div`
  min-height: 55px;
  box-sizing: border-box;
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

  @media only screen and (max-width: 450px) {
    padding: 0px;
  }
`;

export default Header;
