import * as React from 'react';

import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { Shortcuts } from 'shortcuts';

import { useAppContext } from 'ContextApp/AppContext';

const Search = ({ search, onChange, onClickClear, allNotes, trash }) => {
  const {
    searchTag: { name },
  } = useAppContext();

  const shortcuts = new Shortcuts();

  // console.log({ trash });

  React.useEffect(() => {
    shortcuts.add({
      shortcut: 'Ctrl+Shift+S',
      handler: (e) => {
        e.preventDefault();
        const searchNote = document.querySelector('#InputSearchNote');
        searchNote.focus();
      },
    });

    return () => {
      shortcuts.remove({ shortcut: 'Ctrl+Shift+S' });
    };
  }, []);

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

  &:focus {
    border: none;
  }
`;

export default Search;
