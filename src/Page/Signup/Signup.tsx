import * as React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import HeaderDesktop from 'Components/Header/HeaderDesktop';
import UnDrawSignup from 'Images/UnDrawSignup.svg';
import FormUser from '../../Components/FormUser';

const Signup = () => {
  return (
    <Div>
      <HeaderDesktop />
      <div
        style={{
          flexGrow: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DivSignup>
          <img src={UnDrawSignup} alt="UnDrawSignup" />
          <strong>Create an account</strong>
          <FormUser formUser="Signup" />
          <p>By creating an account you agree to our Terms of Service.</p>
          <p>
            Already have an account? <LinkStyle to="/login">Log in</LinkStyle>
          </p>
        </DivSignup>
      </div>
    </Div>
  );
};

//---------------styled--------------

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const DivSignup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: 500px;
  margin: 18px 5%;
  text-align: center;

  img {
    height: 150px;
    width: 120px;
  }
  strong {
    font-size: 32px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    font-weight: 300;
  }
`;

const LinkStyle = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: #3361cc;
`;

export default Signup;
