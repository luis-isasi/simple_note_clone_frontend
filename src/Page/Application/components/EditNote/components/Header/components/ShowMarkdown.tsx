import * as React from 'react';

import styled from 'styled-components';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { HoverText } from 'StylesApp';

const ShowMarkdown = ({ showMarkdown, setShowMakdown }) => {
  const onClick = () => {
    setShowMakdown(!showMarkdown);
  };
  return (
    <Button onClick={onClick}>
      {showMarkdown ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </Button>
  );
};

// ----------------styled---------------

const Button = styled.button`
  &:hover {
    &:before {
      content: 'Markdown';
      ${HoverText}
    }
  }
`;
export default ShowMarkdown;
