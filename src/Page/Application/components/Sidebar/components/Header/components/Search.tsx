import * as React from 'react';

import debounce from 'lodash/debounce';
import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { useQuery } from '@apollo/client';

import { useNoteContext } from '../../../../../context/NoteContext';
import GET_NOTES from 'GraphqlApp/SearchNote.graphql';

const Search = () => {
  const noteData = useNoteContext();
  const [searchGraphqlVariable, setSearchGV] = React.useState('');
  const [search, setSearch] = React.useState('');

  const { error, data } = useQuery(GET_NOTES, {
    variables: { text: searchGraphqlVariable },
  });

  React.useEffect(() => {
    if (!error && data) {
      // noteData.setListNotes(data.notes.reverse());
      noteData.setListNotes(data.notes);
    }
  }, [data]);

  const onChange = (e) => {
    setSearch(e.target.value);
    searchNote(e.target.value);
  };

  const onClickClear = () => {
    setSearch('');
  };

  const searchNote = React.useCallback(
    debounce((value) => {
      setSearchGV(value);
    }, 300),
    []
  );

  return (
    <DivSearch>
      <InputSearch
        type="text"
        placeholder="All Notes"
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
