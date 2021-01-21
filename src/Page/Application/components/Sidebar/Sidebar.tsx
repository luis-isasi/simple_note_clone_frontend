import * as React from 'react';

import styled from 'styled-components';

import Header from './components/Header';
import ListNotes from './components/ListNotes';

const Sidebar = (props) => {
  return (
    <Div className={props.className}>
      <Header />
      <ListNotes />
    </Div>
  );
};

const Div = styled.div.attrs((props) => ({
  className: props.className,
}))`
  display: flex;
  flex-flow: column;
`;
export default Sidebar;
