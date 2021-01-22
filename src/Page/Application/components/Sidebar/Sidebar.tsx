import * as React from 'react';

import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { useQuery } from '@apollo/client';

import { useNoteContext } from '../../context/NoteContext';
import GET_NOTES from 'GraphqlApp/SearchNote.graphql';
import Header from './components/Header';
import ListNotes from './components/ListNotes';

const Sidebar = (props) => {
  const noteData = useNoteContext();
  const [searchGraphqlVariable, setSearchGV] = React.useState('');
  const [search, setSearch] = React.useState('');

  const { loading, error, data } = useQuery(GET_NOTES, {
    variables: { text: searchGraphqlVariable },
  });

  //verificamos que no haya un error y haya data para setearlo en el context
  React.useEffect(() => {
    if (!error && data) {
      noteData.setListNotes(data.notes);
    }
  }, [error, data, noteData]);

  const onChange = (event) => {
    //extraremos el value
    const {
      target: { value: _value },
    } = event;
    //asignamos el value
    setSearch(_value);
    searchNote(_value);
  };

  const onClickClear = () => {
    setSearch('');
    setSearchGV('');
  };

  const searchNote = React.useCallback(
    debounce((value) => {
      setSearchGV(value);
    }, 300),
    []
  );

  return (
    <Div className={props.className}>
      <Header search={search} onChange={onChange} onClickClear={onClickClear} />
      <ListNotes
        loading={loading}
        error={error}
        listNotes={loading ? undefined : data.notes}
        note={noteData.note}
        selectNote={noteData.selectNote}
      />
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
