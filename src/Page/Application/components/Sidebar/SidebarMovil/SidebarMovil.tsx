import * as React from 'react';

import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { useQuery } from '@apollo/client';

import { useAppContext } from 'ContextApp/AppContext';
import GET_NOTES from 'GraphqlApp/GetNotes.graphql';
import SearchMovil from '../components/SearchMovil';
import HeaderMovil from './components/Header';
import ListNotesMovil from './components/ListNotes';
import { IconAnimation, Error } from 'StylesApp';

const SidebarMovil = ({ id, setEditNote }) => {
  const {
    note,
    selectNote,
    trash,
    allNotes,
    searchTag: { id: _tagId, name: _tagName },
  } = useAppContext();

  const [searchGraphqlVariable, setSearchGV] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [filterNotes, setFilterNotes] = React.useState({
    listNotes: undefined,
    lengthPinned: undefined,
  });

  const { loading, error, data } = useQuery(GET_NOTES, {
    variables: { text: searchGraphqlVariable, isInTrash: trash, tagId: _tagId },
  });

  React.useEffect(() => {
    //filter Notes
    let notesPinned = [];
    let notesNoPinned = [];

    //FILTRANDO LA DATA
    if (data) {
      data.notes.forEach((note) => {
        //filtramos y los añadimos en diferentes array para luego juntarlos como queremos
        if (note.pinned) notesPinned.push(note);
        else notesNoPinned.push(note);
      });
      setFilterNotes({
        listNotes: [...notesPinned, ...notesNoPinned],
        lengthPinned: notesPinned.length,
      });
    }
  }, [data, searchGraphqlVariable]);

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

  // Condicionales para renderizar ListNotes, lo hacemos para asegurarnos
  // que listNotes no llegue como undefined
  function renderListNotes() {
    if (loading) {
      return <IconAnimation style={{ fontSize: '60px' }} />;
    }
    if (error) {
      return (
        <Error> Hay un Error en nuestro servidor, intentalo mas tarde </Error>
      );
    }

    if (filterNotes.listNotes) {
      return (
        <ListNotesMovil
          filterNotes={filterNotes}
          note={note}
          selectNote={selectNote}
          searchGraphqlVariable={searchGraphqlVariable}
          onClickClear={onClickClear}
          trash={trash}
          allNotes={allNotes}
          setEditNote={setEditNote}
        />
      );
    }

    return null;
  }

  return (
    <Div id={id}>
      <HeaderMovil allNotes={allNotes} trash={trash} tagName={_tagName} />
      <SearchMovil
        search={search}
        onChange={onChange}
        onClickClear={onClickClear}
        allNotes={allNotes}
        trash={trash}
      />
      {renderListNotes()}
    </Div>
  );
};

const Div = styled.div.attrs((props) => ({
  id: props.id,
}))`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`;

export default React.memo(SidebarMovil);
