import * as React from 'react';

import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import { useAppContext } from 'ContextApp/AppContext';
import { colorBorder } from 'StylesApp';

const Search = ({ search, onChange, onClickClear, allNotes, trash }) => {
  const {
    searchTag: { name },
  } = useAppContext();

  return (
    <DivSearch>
      <div className="searchIcon">
        <SearchIcon />
      </div>
      <InputSearch
        id="InputSearchNote"
        type="text"
        placeholder={name || (allNotes ? 'All Notes' : trash && 'Trash')}
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
  box-sizing: border-box;
  width: 100%;
  padding: 0px 12px;
  margin: 0px;
  height: 40px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colorBorder};

  * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > .searchIcon {
    width: 36px;
    height: 100%;

    > * {
      color: #4e4448;
    }
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
  background-color: trasnparent;
  flex-grow: 1;
  box-sizing: border-box;
  border: none;
  height: 100%;

  &:focus {
    border: none;
  }
`;

export default Search;
