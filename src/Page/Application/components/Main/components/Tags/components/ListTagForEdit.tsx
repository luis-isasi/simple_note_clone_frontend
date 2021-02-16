import * as React from 'react';

import styled from 'styled-components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useMutation } from '@apollo/client';
import { useAppContext } from 'ContextApp/AppContext';

import InputTag from './InputTag';
import { colorBorder } from 'StylesApp';
import DELETE_TAG from 'GraphqlApp/DeleteTag.graphql';

const ListTagForEdit = ({ tags }) => {
  const { setAllNotes, setTrash, setSearchTag } = useAppContext();

  const [deleteTag] = useMutation(DELETE_TAG, {
    update(cache, { data: deleteTag }) {
      cache.modify({
        fields: {
          tags(existingTags = [], { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  const onClick = (tagId) => () => {
    //DELETE_TAG
    deleteTag({ variables: { id: tagId } });
    //SELECT ALL NOTES
    setTrash(false);
    setSearchTag({
      id: null,
      name: undefined,
    });
    setAllNotes(true);
  };

  return tags.map(({ id, name }) => (
    <EditTag key={id}>
      <button onClick={onClick(id)} className="btnDeleteTag">
        <HighlightOffIcon color="secondary" />
      </button>
      <InputTag tagName={name} id={id} />
    </EditTag>
  ));
};

//-------------styled------------
const EditTag = styled.div`
  box-sizing: border-box;
  border: none;
  min-height: 40px;
  padding: 2px 6px;
  margin: 0px 0px 0px 16px;
  border-bottom: 1px solid ${(props) => props.theme.colorBorder};
  font-family: inherit;
  font-size: 14px;
  font-weight: normal;
  display: flex;
  align-items: center;

  * {
    font-family: inherit;
  }

  > .btnDeleteTag {
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin: 0px;
    padding: 0px;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;

    * {
      color: #d63638;
    }
  }
`;

export default ListTagForEdit;
