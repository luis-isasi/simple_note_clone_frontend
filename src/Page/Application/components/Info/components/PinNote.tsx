import * as React from 'react';

import styled from 'styled-components';

import { Switch, Input, Label } from './SwitchStyled';

const PinNote = () => {
  return (
    <Div>
      <span>Pin to top</span>
      <Switch>
        <Input id="checkPin" />
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
export default PinNote;
