import * as React from 'react';

import styled from 'styled-components';

import { Switch, Input, Label } from './SwitchStyled';

const PinNote = ({
  selectedNote,
  selectedNote: { id, pinned },
  pinNote,
  unpinNote,
  selectNote,
  setSwitchPinned,
}) => {
  const handledInputCheck = (e) => {
    const checked = e.target.checked;

    if (checked) {
      pinNote({ variables: { noteId: id } });
      selectNote({ ...selectedNote, pinned: true });
      setSwitchPinned(true);
    } else {
      unpinNote({ variables: { noteId: id } });
      selectNote({ ...selectedNote, pinned: false });
      setSwitchPinned(true);
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
  border-bottom: 1px solid ${(props) => props.theme.colorBorder};
  color: ${(props) => props.theme.colorText};
`;
export default React.memo(PinNote);
