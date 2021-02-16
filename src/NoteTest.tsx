import * as React from 'react';

import styled, { keyframes } from 'styled-components';

const NoteTest = () => {
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: '(min-device-width: 1224px)',
  // });
  // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  // const isTabletOrMobileDevice = useMediaQuery({
  //   query: '(max-device-width: 1224px)',
  // });
  // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });
  return (
    <Div>
      <div>DIV 1</div>

      <div> DIV 2</div>
    </Div>
  );
};

//--------------- styled-----------

const Div = styled.div`
  width: 100%;
  height: 400px;
  background-color: blue;

  @media only screen and (max-width: 989px) and (min-width: 766px) {
    background-color: skyblue;
  }
`;

const Content = styled.div`
  background-color: #e92222;
  height: 650px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;

  > .hideApp {
    background-color: #e92222;
    position: relative;
    left: -300px;
  }

  > .SidebarActive {
    background-color: blue;
    right: 300px;
  }

  > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const App = styled.div`
  background-color: skyblue;
  height: 100%;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
`;

const SidebarRight = styled.div.attrs((props) => ({
  className: props.className,
}))`
  background-color: #0daeee;
  height: 100%;
  width: 300px;
  min-width: 300px;
  position: relative;
  right: 0px;
`;

export default NoteTest;
