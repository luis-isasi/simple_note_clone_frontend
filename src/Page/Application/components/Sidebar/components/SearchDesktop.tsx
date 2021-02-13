import * as React from 'react';

import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { Shortcuts } from 'shortcuts';
import { useMediaQuery } from 'react-responsive';

import { useAppContext } from 'ContextApp/AppContext';
import { colorText } from 'StylesApp';

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
  }, []);

  return (
    <DivSearch>
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

  @media only screen and (max-width: 989px) {
    flex-grow: 1;
    min-width: 180px;
  }
`;

const InputSearch = styled.input.attrs((props) => ({
  id: props.id,
}))`
  border: none;
  height: 22px;
  width: 100%;
  color: ${colorText};

  &:focus {
    border: none;
  }
`;

export default Search;
