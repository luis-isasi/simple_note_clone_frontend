import * as React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import HeaderDesktop from 'Components/Header/HeaderDesktop';
import { useAppContext } from 'Context/App';
import CREATE_USER from '../../graphql/createUser.graphql';
import UnDrawSignup from 'Images/UnDrawSignup.svg';

const Signup = () => {
  const appData = useAppContext();

  const [createUser] = useMutation(CREATE_USER);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password);
    createUser({ variables: { email, password } }).then((response) => {
      appData.signinUser(response.data.createUser);
    });
  };

  return (
    <>
      <HeaderDesktop />
      <DivSignup>
        <img src={UnDrawSignup} alt="UnDrawSignup" />
        <strong>Create an account</strong>
        <Form onSubmit={onSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button id="btnSignup" type="submit">
            Sign up
          </button>
        </Form>
        <p>By creating an account you agree to our Terms of Service.</p>
        <p>
          Already have an account? <LinkStyle to="/login">Log in</LinkStyle>
        </p>
      </DivSignup>
    </>
  );
};

const DivSignup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  margin: 140px auto;
  width: 300px;
  height: 500px;
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

  > #btnSignup {
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

export default Signup;
