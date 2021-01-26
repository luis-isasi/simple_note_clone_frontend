import * as React from 'react';

import styled from 'styled-components';

import { useAppContext } from 'ContextApp/AppContext';

const Main = ({ className, id }) => {
  const AppData = useAppContext();

  React.useEffect(() => {
    const app = document.querySelector('.hideApp');

    const onClick = () => {
      const Main = document.getElementById('main');
      //añadimos las clases para los keyframes
      Main.classList.remove('mainActive');
      Main.classList.add('mainNoActive');
      //luego de la animacion desmontamos el componente del dom
      setTimeout(() => {
        AppData.setMain(false);
      }, 200);
    };

    app.addEventListener('click', onClick);

    return () => {
      app.removeEventListener('click', onClick);
    };
  }, [AppData]);

  return (
    <Div className={className} id={id}>
      DESDE MAIN
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
  min-width: 260px;
`;

export default Main;
