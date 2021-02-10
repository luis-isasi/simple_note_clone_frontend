import * as React from 'react';

import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { useQuery } from '@apollo/client';

import { useAppContext } from 'ContextApp/AppContext';
import GET_NOTES from 'GraphqlApp/GetNotes.graphql';
import Header from './components/Header';
import ListNotes from './components/ListNotes';
import { IconAnimation, Error } from 'StylesApp';

const Sidebar = ({ className }) => {
  const {
    note,
    selectNote,
    trash,
    allNotes,
    searchTag: { id: _tagId },
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
        <ListNotes
          filterNotes={filterNotes}
          note={note}
          selectNote={selectNote}
          searchGraphqlVariable={searchGraphqlVariable}
          onClickClear={onClickClear}
          trash={trash}
          allNotes={allNotes}
        />
      );
    }

    return null;
  }

  return (
    <Div className={className}>
      <Header
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
  className: props.className,
}))`
  flex-basis: 328px;
  max-width: 328px;
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  border-right: 1px solid #d6d4d4;
`;

export default React.memo(Sidebar);
