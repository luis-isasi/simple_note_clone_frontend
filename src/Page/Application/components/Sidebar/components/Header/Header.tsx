import * as React from 'react';

import styled from 'styled-components';

import Main from './components/Main';
import Search from './components/Search';
import CreateNote from './components/CreateNote';

const Header = () => {
  return (
    <Div>
      <Main />
      <Search />
      <CreateNote />
    </Div>
  );
};

const Div = styled.div`
  min-height: 56px;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid #c3c4c7;
`;

export default Header;
