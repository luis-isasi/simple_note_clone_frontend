import * as React from 'react';

import styled from 'styled-components';

import MainIcon from './components/MainIcon';
import Search from './components/Search';
import CreateNote from './components/CreateNote';

const Header = ({ search, onChange, onClickClear, allNotes, trash }) => {
  return (
    <Div>
      <MainIcon />
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
  min-height: 55px;
  box-sizing: border-box;
  padding: 0px 12px;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c3c4c7;

  @media only screen and (max-width: 450px) {
    padding: 0px;
  }

  * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Header;
