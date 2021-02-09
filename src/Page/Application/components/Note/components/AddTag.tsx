import * as React from 'react';

import styled from 'styled-components';
import { useMutation, useApolloClient } from '@apollo/client';

import ADD_TAG from 'GraphqlApp/AddTag.graphql';
import DELETE_TAG from 'GraphqlApp/DeleteTag.graphql';
import { useAppContext } from 'ContextApp/AppContext';

const AddTag = () => {
  const { note, addTagInCurrentNote, deleteTagInCurrentNote } = useAppContext();
  const [tag, setTag] = React.useState('');

  const apolloClient = useApolloClient();

  const [createTag] = useMutation(ADD_TAG, {
    update(cache, { data: { createTag } }) {
      cache.modify({
        fields: {
          tags: (existingTags = []) => {
            const tagId = apolloClient.cache.identify(createTag);
            const existing = existingTags.find((tag) => tag.__ref === tagId);

            if (existing) {
              return existingTags;
            } else {
              return [createTag, ...existingTags];
            }
          },
        },
      });
    },
  });
  const [deleteTag] = useMutation(DELETE_TAG);

  //delete Tag
  const handlerTag = (tag, idTag) => () => {
    deleteTag({ variables: { id: idTag } }).then(() => {
      deleteTagInCurrentNote(tag);
    });
  };

  //Adding a new Tag by mutation and in the cache
  const onSubmit = (e) => {
    e.preventDefault();
    //creating new Tag
    createTag({
      variables: {
        name: tag,
        noteId: note.id,
      },
    }).then(({ data: { createTag } }) => {
      //update cache with new Tag
      addTagInCurrentNote(createTag);
      const inputTag = document.getElementById('inputAddTag');
      inputTag.focus();
    });
    setTag('');
  };

  const renderTags = () => {
    return note.tags.map((tag) => (
      <BtnTag key={tag.id} onClick={handlerTag(tag, tag.id)}>
        {tag.name}
      </BtnTag>
    ));
  };

  return (
    <DivTag>
      {renderTags()}
      <form onSubmit={onSubmit}>
        <InputTag
          id="inputAddTag"
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

const InputTag = styled.input.attrs((props) => ({
  id: props.id,
}))`
  border: none;
  height: 18px;
  padding: 6px 10px;
`;

export default AddTag;
