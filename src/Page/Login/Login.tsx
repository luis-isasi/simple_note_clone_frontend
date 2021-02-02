import * as React from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import HeaderDesktop from 'Components/Header/HeaderDesktop';
import LOGIN_USER from '../../graphql/loginUser.graphql';
import UnDrawLogin from 'Images/UnDrawLogin.svg';
import { useSessionContext } from 'Context/AppSession';

const initialFormState = {
  email: '',
  password: '',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return initialFormState;
  }
};

const Login = () => {
  const appSession = useSessionContext();

  const [state, distpach] = React.useReducer(formReducer, initialFormState);

  const [loginUser] = useMutation(LOGIN_USER);

  const onChange = (e) => {
    console.log(state);
    distpach({
      type: 'SET_VALUE',
      name: e.target.name,
      value: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('enviando Log in');
    loginUser({ variables: state }).then((response) => {
      appSession.signinUser(response.data.login);
    });
  };

  return (
    <>
      <HeaderDesktop />
      <DivLogin>
        <img src={UnDrawLogin} alt="logo" />
        <p id="textLogin">Log In</p>
        <Form onSubmit={onSubmit}>
          <input
            type="text"
            name="email"
            value={state.email}
            placeholder="Email"
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            value={state.value}
            placeholder="Password"
            onChange={onChange}
          />
          <button type="submit" id="btnLogin">
            Log in
          </button>
        </Form>
        <div id="divRemember">
          <input type="checkbox"></input>
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
    </>
  );
};

const DivLogin = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  margin: 130px auto;
  width: 300px;
  height: 500px;
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

const Form = styled.form`
  input {
    box-sizing: border-box;
    width: 100%;
    max-width: 320px;
    height: 38px;
    margin-top: 8px;
    padding: 0px 12px;
    border: solid 1px #e3e0e2;
    border-radius: 5px;
  }

  > #btnLogin {
    box-sizing: border-box;
    font-size: 16px;
    width: 100%;
    height: 38px;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    margin: 16px 0px;
    background-color: #3361cc;

    &:hover {
      background-color: #254ba3;
    }
  }
`;

export default Login;
