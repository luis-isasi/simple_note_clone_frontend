import * as React from 'react';

import styled from 'styled-components';
import ShareIcon from '@material-ui/icons/Share';

import { HoverText } from 'StylesApp';

const Share = () => {
  return (
    <Button>
      <ShareIcon />
    </Button>
  );
};

// ----------------styled---------------
const Button = styled.button`
  &:hover {
    &:before {
      content: 'Share';
      ${HoverText}
    }
  }
`;
export default Share;
