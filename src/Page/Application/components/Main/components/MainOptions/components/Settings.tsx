import * as React from 'react';

import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import styled from 'styled-components';

import { BtnsMain } from './Styled';
import { colorIcon } from 'StylesApp';
const Settings = () => {
  return (
    <Button>
      <SettingsOutlinedIcon />
      Settings
    </Button>
  );
};

const Button = styled.button`
  border-bottom: 1px solid #d6d4d4;
  ${BtnsMain}

  > :nth-child(1) {
    color: ${colorIcon};
  }
`;

export default Settings;
