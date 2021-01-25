import * as React from 'react';

import styled from 'styled-components';

const AddTag = () => {
  const [tag, setTag] = React.useState('');

  const tags = ['mouse', 'react'];
  const renderTags = () => {
    return tags.map((tag, index) => <BtnTag key={index}>{tag}</BtnTag>);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ value: tag });
  };

  return (
    <DivTag>
      <UlTag>{renderTags()}</UlTag>
      <form onSubmit={onSubmit}>
        <InputTag
          placeholder="Add a tag"
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
          }}
        />
      </form>
    </DivTag>
  );
};

//--------------styled-----------------
const DivTag = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const UlTag = styled.ul`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BtnTag = styled.button`
  border-radius: 16px;
  background-color: #d4d5d8;
  color: #3f4042;
  border: none;
  padding: 4px 8px;
  margin-left: 4px;
`;
const InputTag = styled.input`
  border: none;
  height: 32px;
  padding: 6px 10px;
`;

export default AddTag;
