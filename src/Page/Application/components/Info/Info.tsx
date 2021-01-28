import * as React from 'react';

import styled from 'styled-components';

import { useAppContext } from 'ContextApp/AppContext';
import InfoNote from './components/InfoNote';
import PinNote from './components/PinNote';
import Markdown from './components/Markdown';

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
      <InfoNote />
      <PinNote />
      <Markdown />
    </Div>
  );
};

//-------------style------------
const Div = styled.div.attrs((props) => ({
  className: props.className,
  id: props.id,
}))`
  border-left: 1px solid #d6d4d4;
  height: 100%;
  min-width: 320px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  * {
    font-family: inherit;
    font-size: 13px;
    font-weight: normal;
  }
`;
export default Info;
