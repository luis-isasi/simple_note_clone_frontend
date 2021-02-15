import * as React from 'react';

import styled from 'styled-components';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import { HoverText } from 'StylesApp';

const ShowMarkdown = ({ showMarkdown, setShowMakdown }) => {
  const onClick = () => {
    setShowMakdown(!showMarkdown);
  };
  return (
    <Button onClick={onClick}>
      {showMarkdown ? (
        <VisibilityOffOutlinedIcon />
      ) : (
        <VisibilityOutlinedIcon />
      )}
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
