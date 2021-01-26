import * as React from 'react';

import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { useQuery } from '@apollo/client';

import { useAppContext } from 'ContextApp/AppContext';
import GET_NOTES from 'GraphqlApp/GetNote.graphql';
import Header from './components/Header';
import ListNotes from './components/ListNotes';

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

  return (
    <Div className={className}>
      <Header search={search} onChange={onChange} onClickClear={onClickClear} />
      <ListNotes
        loading={loading}
        error={error}
        listNotes={loading ? undefined : data.notes}
        note={appData.note}
        selectNote={appData.setNote}
        searchGraphqlVariable={searchGraphqlVariable}
        onClickClear={onClickClear}
      />
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
