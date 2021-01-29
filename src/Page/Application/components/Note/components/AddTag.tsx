import * as React from 'react';

import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';

import ADD_TAG from 'GraphqlApp/AddTag.graphql';
import { useAppContext } from 'ContextApp/AppContext';

const AddTag = () => {
  const { note, addTagToCurrentNote, deleteTagInCurrentNote } = useAppContext();
  const [tag, setTag] = React.useState('');

  const [createTag] = useMutation(ADD_TAG, {
    // update(cache, { data: { createTag } }) {
    //   cache.modify({
    //     fields: {
    //       tags(existingTags = []) {
    //         const tag = cache.writeFragment({
    //           data: createTag,
    //           fragment: gql`
    //             fragment NewTag on Tag {
    //               id
    //               name
    //               user {
    //                 id
    //                 email
    //               }
    //             }
    //           `,
    //         });
    //         return [...existingTags, tag];
    //       },
    //     },
    //   });
    // },
  });

  const deleteTag = (tag) => () => {
    deleteTagInCurrentNote(tag);
  };

  const renderTags = () => {
    return note.tags.map((tag) => (
      <BtnTag key={tag.id} onClick={deleteTag(tag)}>
        {tag.name}
      </BtnTag>
    ));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //creamos nuevo tag con el su name e id
    createTag({
      variables: {
        name: tag,
        noteId: note.id,
      },
    });
  };

  return (
    <DivTag>
      {renderTags()}
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
  box-sizing: border-box;
  width: 100%;
  min-height: 45px;
  height: auto;
  max-height: 60px;
  padding: 0px 10px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c2c1c1;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }
`;

const BtnTag = styled.button`
  border-radius: 16px;
  background-color: #dcdcde;
  color: #3f4042;
  border: none;
  padding: 3px 14px;
  margin: 4px;
  margin-left: 4px;
  cursor: pointer;
`;

const InputTag = styled.input`
  border: none;
  height: 18px;
  padding: 6px 10px;
`;

export default AddTag;
