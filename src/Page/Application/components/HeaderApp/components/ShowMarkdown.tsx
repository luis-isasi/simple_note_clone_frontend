import * as React from 'react';

import styled from 'styled-components';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

// import { useAppContext } from 'ContextApp/AppContext';

import { HoverText } from 'StylesApp';

const ShowMarkdown = ({ note, showMarkdown, setShowMakdown }) => {
  const { text } = note;
  console.log({ text });

  const onClick = () => {
    setShowMakdown(!showMarkdown);
  };
  return (
    <Button onClick={onClick}>
      {showMarkdown ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
