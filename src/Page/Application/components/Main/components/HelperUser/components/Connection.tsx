import * as React from 'react';

import styled from 'styled-components';
import WifiIcon from '@material-ui/icons/Wifi';

const Conection = () => {
  return (
    <Button>
      <WifiIcon />
      <p>Server connection</p>
    </Button>
  );
};

//-------------styled----------
const Button = styled.button`
  > * {
    margin-right: 12px;
  }
`;

export default Conection;
