import * as React from 'react';

import styled from 'styled-components';

import CreateNote from './CreateNote';
import Search from './search';
import Main from './Main';

const SidebarSearch = () => {
  return (
    <Div>
      <Main />
      <Search />
      <CreateNote />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  align-items: center;
`;
export default SidebarSearch;
