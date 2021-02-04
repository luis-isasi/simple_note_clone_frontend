import * as React from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HeaderDesktop from 'Components/Header/HeaderDesktop';
import UnDrawLogin from 'Images/UnDrawLogin.svg';
import FromUser from '../../Components/FormUser';

const Login = () => {
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
        <DivLogin>
          <img src={UnDrawLogin} alt="logo" />
          <h2 id="textLogin">Log In</h2>
          <FromUser formUser="Login" />
          <div id="divRemember">
            <input type="checkbox" />
            <b>Rembember Me</b>
          </div>
          <LinkStyle to="/forgot">Forgot you password?</LinkStyle>
          <hr
            style={{
              borderBottom: '0px solid #c4c5c9',
              width: '100%',
            }}
          />
          <p id="toSignup">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </DivLogin>
      </div>
    </Div>
  );
};

//--------------styled---------------

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const DivLogin = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: 500px;
  margin: 18px 5%;
  vertical-align: center;

  img {
    height: 150px;
    width: 120px;
  }
  > #textLogin {
    font-size: 32px;
    font-weight: 500;
  }
  > #divRemember {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 110px;
  }
  > #toSignup {
    font-size: 14px;
    > * {
      text-decoration: none;
      color: #6694ff;
    }
  }
`;

const LinkStyle = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: #3361cc;
`;

export default Login;
