import * as React from 'react';

import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import { Button, Div } from './Styled';
import { colorIcon } from 'StylesApp';
import SettingsModal from '../../../../../Modals/SettingsModal/SettingsModal';

const Settings = () => {
  const [state, setState] = React.useState(false);

  const onClick = () => {
    setState(true);
  };

  return (
    <>
      <Button onClick={onClick}>
        <Div>
          <span>
            <SettingsOutlinedIcon style={{ color: `${colorIcon}` }} />
          </span>
          <p>Settings</p>
        </Div>
      </Button>
      {state && <SettingsModal setState={setState} />}
    </>
  );
};

export default React.memo(Settings);
