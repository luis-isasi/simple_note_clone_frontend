import * as React from 'react';

import styled from 'styled-components';

import InfoNote from './components/InfoNote';
import PinNote from './components/PinNote';
import Markdown from './components/Markdown';

const Info = ({ className, id }) => {
  return (
    <Div className={className} id={id}>
      <InfoNote />
      <PinNote />
      <Markdown />
    </Div>
  );
};

//-------------style------------
const Div = styled.div.attrs((props) => ({
  className: props.className,
  id: props.id,
}))`
  border-left: 1px solid #d6d4d4;
  height: 100%;
  min-width: 320px;
  max-width: 320px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  * {
    font-family: inherit;
    font-size: 13px;
    font-weight: normal;
  }
`;
export default Info;
