import * as React from 'react';

import styled from 'styled-components';

import HeaderDesktop from '../../Components/Header/HeaderDesktop';
import LinkSignup from '../../Components/Header/components/LinkSignup';
const Home = () => {
  return (
    <>
      <HeaderDesktop />
      <DivHome>
        <h3>The Simple way to keep notes</h3>
        <p>
          All your notes, synced on all your devices. Get Simplenote now for
          iOS, Android, Mac, Windows, Linux, or in your browser.
        </p>
        <LinkSignup>Sign up now</LinkSignup>
      </DivHome>
    </>
  );
};

const DivHome = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
  min-width: 300px;
  max-width: 600px;
  margin: 80px auto;
  padding: 0px 30px;
  height: 400px;

  h3 {
    font-size: 48px;
    font-weight: 600;
    text-align: center;
  }
  p {
    font-size: 20px;
    font-weight: 300;
    text-align: center;
  }
  > :nth-child(3) {
    padding: 8px 12px;
    font-weight: 300;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
    background-color: #3361cc;

    &:hover {
      background-color: #25489b;
    }
  }
`;

export default Home;
