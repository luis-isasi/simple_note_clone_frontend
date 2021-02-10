import * as React from 'react';

import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';

import { useAppContext } from 'ContextApp/AppContext';

const Search = ({ search, onChange, onClickClear, allNotes, trash }) => {
  const {
    searchTag: { name },
  } = useAppContext();

  return (
    <DivSearch>
      <InputSearch
        id="InputSearchNote"
        type="text"
        placeholder={allNotes ? 'All Notes' : trash ? 'Trash' : name}
        value={search}
        onChange={onChange}
      />
      <div>
        {search && (
          <button onClick={onClickClear}>
            <ClearIcon />
          </button>
        )}
      </div>
    </DivSearch>
  );
};

//------------styled-------------
const DivSearch = styled.div`
  /* background-color: skyblue; */

  height: 28px;
  flex-grow: 1;
  max-width: 280px;
  min-width: 180px;
  border-radius: 14px;
  border: 1px solid #c3c4c7;
  padding: 0px 10px;
  margin: 0px 4px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 450px) {
    margin: 0px 12px;
  }

  * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div {
    height: 100%;
    width: 25px;
    button {
      border: none;
      background-color: transparent;
      cursor: pointer;

      * {
        margin-top: 2px;
        font-size: 20px;
        color: #5b5d63;
      }
    }
  }
`;

const InputSearch = styled.input.attrs((props) => ({
  id: props.id,
}))`
  flex-grow: 1;
  box-sizing: border-box;
  border: none;
  height: 100%;

  &:focus {
    border: none;
  }
`;

export default Search;
