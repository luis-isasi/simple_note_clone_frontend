import * as React from 'react';

import styled, { keyframes } from 'styled-components';
import Media from 'react-media';
import { useMediaQuery } from 'react-responsive';
// import Markdown from 'markdown-to-jsx';

// import Test from './Test';

const NoteTest = () => {
  const [state, setState] = React.useState(false);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <button
        onClick={() => {
          setState(!state);
        }}
      >
        {state ? 'ON' : 'OFF'}
      </button>
      <Content>
        <App className={state ? 'hideApp' : null}>
          <p>APP</p>
        </App>
        {state && (
          <SidebarRight className={state ? 'SidebarActive' : 'SidebarNoActive'}>
            <p>SIDEBAR RIGHT</p>
          </SidebarRight>
        )}
      </Content>
    </div>
  );
};
// return (
//   <div>
//     <Media
//       queries={{
//         small: '(max-width: 599px)',
//         medium: '(min-width: 600px) and (max-width: 1199px)',
//         large: '(min-width: 1200px)',
//       }}
//     >
//       {(matches) => (
//         <>
//           {matches.small && <p>I am small!</p>}
//           {matches.medium && null}
//           {matches.large && <p>I am large!</p>}
//         </>
//       )}
//     </Media>
//   </div>
// );
// const isDesktopOrLaptop = useMediaQuery({
//   query: '(min-device-width: 1224px)',
// });
// const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
// const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
// // const isTabletOrMobileDevice = useMediaQuery({
// //   query: '(max-device-width: 1224px)',
// // });
// // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
// // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });
// return (
//   <div>
//     <h1>Device Test!</h1>
//     {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
//     {isBigScreen && <p>You also have a huge screen</p>}
//     {isTabletOrMobile && (
//       <p>You are sized like a tablet or mobile phone though</p>
//     )}
//   </div>
// );
// };

//--------------- styled-----------

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
