import * as React from 'react';

import styled from 'styled-components';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import { Shortcuts } from 'shortcuts';

import { useAppContext } from 'ContextApp/AppContext';
import { HoverText } from 'StylesApp';

const ToggleSidebar = () => {
  const { isOpenSidebar, setIsOpenSidebar } = useAppContext();
  const shortcuts = new Shortcuts();

  React.useEffect(() => {
    shortcuts.add({
      shortcut: 'Ctrl+Shift+F',
      handler: (e) => {
        e.preventDefault();
        onClick();
        return false;
      },
    });
    return () => {
      shortcuts.remove({ shortcut: 'Ctrl+Shift+F' });
    };
  }, [isOpenSidebar]);

  const onClick = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  return (
    <Button onClick={onClick} hide={isOpenSidebar} id="btnToggle">
      <VerticalAlignBottomIcon />
    </Button>
  );
};

// --------------styled--------------
const Button = styled.button`
  background-color: transparent;
  width: 36px;
  height: 36px;
  margin-left: 8px;
  border: none;
  cursor: pointer;
  transform: ${(props) => (props.hide ? 'rotate(90deg)' : 'rotate(270deg)')};

  &:hover {
    &:before {
      content: 'Toggle Sidebar';
      width: 100px;
      ${HoverText}
      right: ${(props) => (props.hide ? '' : '-6px')};
      top: ${(props) => (props.hide ? '0px' : '40px')} !important;
      left: ${(props) => (props.hide ? '-6px' : '')};
      transform: ${(props) =>
    props.hide ? 'rotate(270deg)' : 'rotate(90deg)'};
    }
  }
`;

export default ToggleSidebar;
