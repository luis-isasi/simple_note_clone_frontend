import * as React from 'react';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { colorIcon } from 'StylesApp';
import { Button, Div } from './Styled';

const Trash = ({
  isTrash,
  setIsTrash,
  setIsAllNotes,
  setSearchTag,
  showMain,
}) => {
  const onClick = () => {
    setIsAllNotes(false);
    setSearchTag({
      id: null,
      name: undefined,
    });
    setIsTrash(true);
    //close Main
    showMain(false);
  };
  return (
    <Button select={isTrash} onClick={onClick}>
      <Div select={isTrash}>
        <span>
          <DeleteForeverOutlinedIcon />
        </span>
        <p>Trash</p>
      </Div>
    </Button>
  );
};

export default Trash;
