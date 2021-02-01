import * as React from 'react';

import styled from 'styled-components';
import WifiIcon from '@material-ui/icons/Wifi';

const Conection = () => {
  return (
    <A>
      <WifiIcon />
      <p>Server connection</p>
    </A>
  );
};

//-------------styled----------
const A = styled.a`
  > * {
    margin-right: 12px;
  }
`;

export default Conection;
