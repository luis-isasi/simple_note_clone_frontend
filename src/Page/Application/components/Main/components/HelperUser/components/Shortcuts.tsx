import * as React from 'react';

import styled from 'styled-components';

// import ShortcutsModal from '../../../../../Modals/ShortcutsModal';

const Shortcuts = ({ setShortcutsModal }) => {
  const onClick = () => {
    setShortcutsModal(true);
  };

  return <Button onClick={onClick}>Keyboard Shortcuts</Button>;
};

//-------------styled----------
const Button = styled.button``;

export default Shortcuts;
