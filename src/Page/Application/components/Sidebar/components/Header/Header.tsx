import * as React from 'react';

import styled from 'styled-components';

import MainIcon from './components/MainIcon';
import CreateNote from './components/CreateNote';

const Header = ({ isAllNotes, isTrash, tagName }) => {
  return (
    <Div>
      <MainIcon />
      <h3>
        {isAllNotes && !tagName && 'All Notes'}
        {isTrash && !tagName && 'Trash'}
        {tagName && isAllNotes && 'Notes with  Selected Tag'}
        {tagName && isTrash && 'Notes with  Selected Tag'}
      </h3>
      <CreateNote hover={true} />
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
