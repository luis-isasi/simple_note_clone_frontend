import * as React from 'react';

import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { Shortcuts } from 'shortcuts';
import { useMediaQuery } from 'react-responsive';

import { useAppContext } from 'ContextApp/AppContext';
import { colorBorder, colorText } from 'StylesApp';

const Search = ({ search, onChange, onClickClear, allNotes, trash }) => {
  const {
    searchTag: { name },
  } = useAppContext();

  const shortcuts = new Shortcuts();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 767px)',
  });

  React.useEffect(() => {
    if (isDesktopOrLaptop) {
      shortcuts.add({
        shortcut: 'Ctrl+Shift+S',
        handler: (e) => {
          e.preventDefault();
          const searchNote = document.querySelector('#InputSearchNote');
          searchNote.focus();
        },
      });
    }
    return () => {
      if (isDesktopOrLaptop) {
        shortcuts.remove({ shortcut: 'Ctrl+Shift+S' });
      }
    };
  }, [isDesktopOrLaptop]);

  return (
    <DivSearch>
      <div className="searchIcon">
        <SearchIcon />
      </div>
      <InputSearch
        id="InputSearchNote"
        type="text"
        placeholder={name || (allNotes ? 'Search Notes..' : trash && 'Trash')}
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
  border-bottom: 1px solid ${(props) => props.theme.colorBorder};

  * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > .searchIcon {
    width: 24px;
    height: 24px;
    padding: 0px 8px;

    > * {
      color: #4e4448;
      font-size: 20px;
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
  color: ${(props) => props.theme.colorText};

  &:focus {
    border: none;
  }
`;

export default Search;
