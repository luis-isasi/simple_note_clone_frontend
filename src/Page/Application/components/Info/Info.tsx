import * as React from 'react';

import styled from 'styled-components';

import { useAppContext } from 'ContextApp/AppContext';

import NotesIcon from '@material-ui/icons/Notes';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

const Info = ({ className, id }) => {
  const AppData = useAppContext();

  React.useEffect(() => {
    const app = document.querySelector('.hideApp');

    const onClick = () => {
      const info = document.querySelector('#info');
      //añadimos las clases para los keyframes
      info.classList.remove('infoActive');
      info.classList.add('infoNoActive');
      //luego de la animacion desmontamos el componente del dom
      setTimeout(() => {
        AppData.setInfo(false);
      }, 200);
    };
    app.addEventListener('click', onClick);

    return () => {
      app.removeEventListener('click', onClick);
    };
  }, [AppData]);

  return (
    <Div className={className} id={id}>
      <div>
        <button>PRIMER BUTTON</button>
        <button>SEGUNDO BUTTON</button>
      </div>
    </Div>
  );
};

//-------------style------------
const Div = styled.div.attrs((props) => ({
  className: props.className,
  id: props.id,
}))`
  background-color: skyblue;
  height: 100%;
  min-width: 320px;

  div {
    background-color: gray;
    height: 100%;
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
export default Info;
