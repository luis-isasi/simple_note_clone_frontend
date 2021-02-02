import * as React from 'react';

import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';

const Search = ({ search, onChange, onClickClear, allNotes }) => {
  return (
    <DivSearch>
      <InputSearch
        type="text"
        placeholder={allNotes ? 'All Notes' : 'Trash'}
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

const DivSearch = styled.div`
  height: 25px;
  width: 205px;
  border-radius: 14px;
  border: 1px solid #c3c4c7;
  padding: 0px 10px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;

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

const InputSearch = styled.input`
  border: none;
  height: 22px;

  &:focus {
    border: none;
  }
`;

export default Search;
