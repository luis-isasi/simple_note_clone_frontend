import * as React from 'react';

import styled from 'styled-components';

const InputTag = ({ tagName, id }) => {
  const [tagValue, setTagValue] = React.useState(tagName);

  const onChange = (event) => {
    const {
      target: { value: _value },
    } = event;
    setTagValue(_value);
  };

  return <Input value={tagValue} onChange={onChange} />;
};

//-------------styled-------------
const Input = styled.input`
  box-sizing: border-box;
  border: none;
  height: 100%;
  font-size: 14px;
  margin: 0px;
  padding: 0px;
`;

export default InputTag;
