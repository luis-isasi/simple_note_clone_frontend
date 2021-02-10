import * as React from 'react';

import styled from 'styled-components';

import Main from './components/MainIcon';
import Search from './components/Search';
import CreateNote from './components/CreateNote';

const Header = ({ search, onChange, onClickClear, allNotes, trash }) => {
  return (
    <Div>
      <Main />
      <Search
        search={search}
        onChange={onChange}
        onClickClear={onClickClear}
        allNotes={allNotes}
        trash={trash}
      />
      <CreateNote />
    </Div>
  );
};

const Div = styled.div`
  box-sizing: border-box;
  min-height: 56px;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid #c3c4c7;

  * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 989px) {
    padding: 0px 12px;
  }
`;

export default Header;
