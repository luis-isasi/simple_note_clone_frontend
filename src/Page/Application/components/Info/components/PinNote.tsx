import * as React from 'react';

import styled from 'styled-components';

import { colorBorder, colorText } from 'StylesApp';
import { Switch, Input, Label } from './SwitchStyled';

const PinNote = ({
  note,
  note: { id, pinned },
  pinNote,
  unpinNote,
  selectNote,
}) => {
  const handledInputCheck = (e) => {
    const checked = e.target.checked;

    if (checked) {
      selectNote({ ...note, pinned: true });
      pinNote({ variables: { noteId: id } });
    } else {
      selectNote({ ...note, pinned: false });
      unpinNote({ variables: { noteId: id } });
    }
  };

  return (
    <Div>
      <span>Pin to top</span>
      <Switch>
        <Input id="checkPin" onChange={handledInputCheck} checked={pinned} />
        <Label htmlFor="checkPin" />
      </Switch>
    </Div>
  );
};

//------------styled-----------
const Div = styled.div`
  box-sizing: border-box;
  padding: 20px;
  height: 62px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colorBorder};
  color: ${colorText};
  /* color: #646970; */
`;
export default React.memo(PinNote);
