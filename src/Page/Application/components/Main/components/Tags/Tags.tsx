import * as React from 'react';

import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import GET_TAG from 'GraphqlApp/GetTags.graphql';
import { IconAnimation, Error } from 'StylesApp';
import ListTagForEdit from './components/ListTagForEdit';

const Tags = ({ setSearchTag, setAllNotes, setTrash }) => {
  const [state, setState] = React.useState(true);
  const { loading, error, data } = useQuery(GET_TAG);

  const renderTags = () => {
    if (loading) {
      return <IconAnimation style={{ fontSize: '60px' }} />;
    }
    if (error) {
      return (
        <Error>Hay un Error en nuestro servidor, intentalo mas tarde</Error>
      );
    }

    const searchByTag = (id, name) => () => {
      setSearchTag({
        id: id,
        name: name,
      });
      setAllNotes(false);
      setTrash(false);
    };

    return data.tags.map(({ id, name }) => (
      <ButtonTag key={id} onClick={searchByTag(id, name)}>
        {name}
      </ButtonTag>
    ));
  };

  const handlerBtnEdit = () => {
    setState(!state);
  };

  const handlerBtnDone = () => {
    setState(!state);
  };

  return (
    <Div>
      <Title>
        <p>Tags</p>
        {data &&
          !loading &&
          !error &&
          (data.tags.length ? (
            state ? (
              <button onClick={handlerBtnEdit}>Edit</button>
            ) : (
              <button onClick={handlerBtnDone}>Done</button>
            )
          ) : null)}
      </Title>
      <Ul>{state ? renderTags() : <ListTagForEdit tags={data.tags} />}</Ul>
    </Div>
  );
};

//-------------style------------
const Div = styled.div`
  border-top: 1px solid #d6d4d4;
  border-bottom: 1px solid #d6d4d4;
  overflow: hidden;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;

  * {
    color: #646970;
  }
`;

const Title = styled.div`
  box-sizing: border-box;
  min-height: 64px;
  width: 100%;
  padding: 0px 16px;
  font-family: inherit;
  font-size: 14px;
  font-weight: normal;

  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  p {
    font-weight: 500;
  }

  > button {
    color: #3361cc;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

const Ul = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  overflow-y: auto;

  &::-webkit-scrollbar {
    /* -webkit-appearance: none; */
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c2c1c1;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }
`;

const ButtonTag = styled.button`
  background-color: transparent;
  border: none;
  height: 40px;
  padding: 2px 6px;
  margin: 0px 0px 0px 16px;
  border-bottom: 1px solid #d6d4d4;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: normal;

  &:hover {
    background-color: #f6f7f7;
  }
`;

export default Tags;
