import * as React from 'react';

import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import GET_TAG from 'GraphqlApp/GetTags.graphql';
import { IconAnimation, Error } from 'StylesApp';

const Tags = () => {
  const { loading, error, data } = useQuery(GET_TAG);

  // console.log({ data });

  const renderTags = () => {
    if (loading) {
      return <IconAnimation style={{ fontSize: '60px' }} />;
    }
    if (error) {
      return (
        <Error>Hay un Error en nuestro servidor, intentalo mas tarde</Error>
      );
    }
    return data.tags.map(({ id, name }) => <Button key={id}>{name}</Button>);
  };

  return (
    <Div>
      <Title>
        <p>Tags</p>
        <button>Edit</button>
      </Title>
      <Ul>{renderTags()}</Ul>
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
  overflow-y: scroll;

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

const Button = styled.button`
  background-color: transparent;
  border: none;
  min-height: 33px;
  margin: 4px 0px 4px 16px;
  text-align: left;
  border-bottom: 1px solid #d6d4d4;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: normal;
`;

export default Tags;
