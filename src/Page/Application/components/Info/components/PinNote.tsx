import * as React from 'react';

import styled from 'styled-components';

import { Switch, Input, Label } from './SwitchStyled';

const PinNote = ({
  note,
  note: { id, pinned },
  pinNote,
  unpinNote,
  setNote,
}) => {
  console.log({ pinned });

  const handledInputCheck = (e) => {
    const checked = e.target.checked;

    if (checked) {
      setNote({ ...note, pinned: true });
      pinNote({ variables: { noteId: id } });
    } else {
      setNote({ ...note, pinned: false });
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
  border-bottom: 1px solid #d6d4d4;
  color: #646970;
`;
export default React.memo(PinNote);
