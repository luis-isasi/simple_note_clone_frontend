import * as React from 'react';

import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import GET_TAG from 'GraphqlApp/GetTags.graphql';
import { IconAnimation, Error, scrollbarStyle } from 'StylesApp';
import ListTagForEdit from './components/ListTagForEdit';

const Tags = ({ setSearchTag, showMain }) => {
  const [state, setState] = React.useState(true);
  const { loading, error, data } = useQuery(GET_TAG);

  const handlerBtnEdit = () => {
    setState(!state);
  };

  const handlerBtnDone = () => {
    setState(!state);
  };

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
        id,
        name,
      });
      //CLOSE THE MAIN
      showMain(false);
    };

    return data.tags.map(({ id, name }) => (
      <ButtonTag key={id} onClick={searchByTag(id, name)}>
        {name}
      </ButtonTag>
    ));
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
  border-top: 1px solid ${(props) => props.theme.colorBorder};
  border-bottom: 1px solid ${(props) => props.theme.colorBorder};
  overflow: hidden;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;

  * {
    color: ${(props) => props.theme.colorText};
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

  ${scrollbarStyle}
`;

const ButtonTag = styled.button`
  background-color: transparent;
  border: none;
  height: 40px;
  min-height: 40px;
  padding: 2px 6px;
  margin: 0px 0px 0px 16px;
  border-bottom: 1px solid ${(props) => props.theme.colorBorder};
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background-color: ${(props) => props.theme.backgroundHoverTag};
  }
`;

export default Tags;
