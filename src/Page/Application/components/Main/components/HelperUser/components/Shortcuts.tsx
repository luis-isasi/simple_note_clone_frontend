import * as React from 'react';

import styled from 'styled-components';

const Shortcuts = ({ setIsOpenModalShortcuts }) => {
  const onClick = () => {
    setIsOpenModalShortcuts(true);
  };

  return <Button onClick={onClick}>Keyboard Shortcuts</Button>;
};

//-------------styled----------
const Button = styled.button``;

export default Shortcuts;
