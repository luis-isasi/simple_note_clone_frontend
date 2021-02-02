import * as React from 'react';

import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { useQuery } from '@apollo/client';

import { useAppContext } from 'ContextApp/AppContext';
import GET_NOTES from 'GraphqlApp/GetNote.graphql';
import Header from './components/Header';
import ListNotes from './components/ListNotes';
import { IconAnimation, Error } from 'StylesApp';

const Sidebar = ({ className }) => {
  const appData = useAppContext();

  const [searchGraphqlVariable, setSearchGV] = React.useState('');
  const [search, setSearch] = React.useState('');

  const { loading, error, data } = useQuery(GET_NOTES, {
    variables: { text: searchGraphqlVariable },
  });

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

  const filterListNotes = () => {
    //filter Notes
    let notesPinned = [];
    let notesNoPinned = [];

    data.notes.forEach((note) => {
      //filtramos y los añadimos en diferentes array para luego juntarlos como queremos
      if (note.pinned) notesPinned.push(note);
      else notesNoPinned.push(note);
    });

    return {
      listNotes: [...notesPinned, ...notesNoPinned],
      lengthPinned: notesPinned.length,
    };
  };

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
    return (
      <ListNotes
        filterNotes={filterListNotes()}
        note={appData.note}
        selectNote={appData.selectNote}
        searchGraphqlVariable={searchGraphqlVariable}
        onClickClear={onClickClear}
        trash={appData.trash}
      />
    );
  }

  return (
    <Div className={className}>
      <Header
        search={search}
        onChange={onChange}
        onClickClear={onClickClear}
        allNotes={appData.allNotes}
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
export default Sidebar;
