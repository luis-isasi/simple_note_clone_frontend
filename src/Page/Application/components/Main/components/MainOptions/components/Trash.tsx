import * as React from 'react';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { colorIcon } from 'StylesApp';
import { Button, Div } from './Styled';

const Trash = ({ trash, setTrash, setAllNotes, setSearchTag, showMain }) => {
  const onClick = () => {
    setAllNotes(false);
    setSearchTag({
      id: null,
      name: undefined,
    });
    setTrash(true);
    //close Main
    showMain(false);
  };
  return (
    <Button select={trash} onClick={onClick}>
      <Div select={trash}>
        <span>
          <DeleteForeverOutlinedIcon />
        </span>
        <p>Trash</p>
      </Div>
    </Button>
  );
};

export default Trash;
