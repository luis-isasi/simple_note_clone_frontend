import * as React from 'react';

import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { useMutation } from '@apollo/client';

import { useSessionContext } from 'Context/AppSession';
import CREATE_USER from '../../graphql/createUser.graphql';
import LOGIN_USER from '../../graphql/loginUser.graphql';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { InitialFormState, FormAction } from './types';

const initialFormState: InitialFormState = {
  email: '',
  password: '',
  showPassword: false,
  errors: {
    errorMessage: '',
    email: '',
    password: '',
  },
};

const formReducer = (state: InitialFormState, action: FormAction) => {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'SET_ERROR': {
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };
    }
    case 'SET_CLEAR_ERROR': {
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: '',
        },
      };
    }
    case 'SET_SHOW_PASSWORD': {
      return {
        ...state,
        showPassword: !state.showPassword,
      };
    }
    default:
      return initialFormState;
  }
};

const FormUser = ({ formUser }) => {
  const appSession = useSessionContext();

  const [state, distpach] = React.useReducer(formReducer, initialFormState);

  const [createUser, { loading: loadingSignup }] = useMutation(CREATE_USER);
  const [loginUser, { loading: loadingLogin }] = useMutation(LOGIN_USER);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    distpach({
      type: 'SET_ERROR',
      field: 'errorMessage',
      error: '',
    });

    distpach({
      type: 'SET_VALUE',
      name: name,
      value: value,
    });
    //APLICACMOS DEBOUNCE PARA VALIDAR LOS FIELDS
    onValidateFields(name, value);
  };

  const onValidateFields = React.useCallback(
    debounce((name, value) => {
      if (name === 'email') {
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (emailRegex.test(value)) {
          distpach({
            type: 'SET_CLEAR_ERROR',
            field: name,
          });
        } else {
          distpach({
            type: 'SET_ERROR',
            field: name,
            error: 'The e-mail is not valid',
          });
        }
      }

      if (name === 'password') {
        if (value.length >= 6) {
          distpach({
            type: 'SET_CLEAR_ERROR',
            field: name,
          });
        } else {
          distpach({
            type: 'SET_ERROR',
            field: name,
            error: 'The password should have more then 6 characters',
          });
        }
      }
    }, 300),
    []
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (!state.email || !state.password) {
      distpach({
        type: 'SET_ERROR',
        field: 'errorMessage',
        error: 'The fields cannot be empty',
      });
      return;
    }

    console.log('enviando createUser');
    const btnLogin = document.querySelector(
      formUser === 'Login' ? '#btnLogin' : '#btnSignup'
    );
    btnLogin.classList.add('btnLoading');
    if (formUser === 'Login') {
      //MUTATION lOGIN_USER
      loginUser({ variables: state })
        .then((response) => {
          btnLogin.classList.remove('btnLoading');
          appSession.signinUser(response.data.login);
        })
        .catch((error) => {
          btnLogin.classList.remove('btnLoading');
          distpach({
            type: 'SET_ERROR',
            field: 'errorMessage',
            error: error.message,
          });
        });
    } else {
      //MUTATION CREATE_USER
      createUser({
        variables: { email: state.email, password: state.password },
      })
        .then((response) => {
          btnLogin.classList.remove('btnLoading');
          appSession.signinUser(response.data.createUser);
        })
        .catch((error) => {
          btnLogin.classList.remove('btnLoading');
          distpach({
            type: 'SET_ERROR',
            field: 'errorMessage',
            error: error.message,
          });
        });
    }
  };

  const handledInputPassword = () => {
    const inputPassword = document.querySelector(
      formUser === 'Login' ? '#inputLoginPassword' : '#inputSignUpPassword'
    );

    if (inputPassword.type === 'password') {
      //show password
      inputPassword.type = 'text';
    } else {
      //hide password
      inputPassword.type = 'password';
    }
    distpach({
      type: 'SET_SHOW_PASSWORD',
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <p className="errorMessage">{state.errors.errorMessage}</p>
      <input
        type="text"
        name="email"
        value={state.email}
        onChange={onChange}
        placeholder="Email"
      />
      <p className="errorMessage-input">{state.errors.email}</p>
      <ContentPswrd>
        <input
          id={
            formUser === 'Login' ? 'inputLoginPassword' : 'inputSignUpPassword'
          }
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={onChange}
        />
        <button type="button" onClick={handledInputPassword}>
          {state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </button>
      </ContentPswrd>
      <p className="errorMessage-input">{state.errors.password}</p>
      <button
        id={formUser === 'Login' ? 'btnLogin' : 'btnSignup'}
        type="submit"
        className={(state.errors.email || state.errors.password) && 'btnBlock'}
        disabled={
          loadingSignup ||
          loadingLogin ||
          state.errors.email ||
          state.errors.password
        }
      >
        {formUser === 'Login' ? 'Log in' : 'Sign up'}
      </button>
    </Form>
  );
};

//-----------------styled--------------
const Form = styled.form`
  width: 100%;

  .errorMessage {
    color: #d42c35;
    font-family: inherit;
    font-weight: 300;
    width: 100%;
    text-align: center;
  }

  .errorMessage-input {
    color: #d42c35;
    font-family: inherit;
    font-weight: 300;
    font-size: 14px;
    width: 100%;
    text-align: center;
    margin-top: 2px;
  }

  > input {
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

  .btnLoading {
    &:disabled {
      cursor: progress !important;
    }
  }
  .btnBlock {
    &:disabled {
      cursor: no-drop !important;
    }
  }
`;

const ContentPswrd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  border: solid 1px #e3e0e2;
  width: 100%;
  max-width: 320px;

  height: 38px;
  margin-top: 8px;
  border-radius: 5px;

  > input {
    flex-grow: 1;

    height: 100%;
    padding: 0px 12px;
    border: none;
  }

  > button {
    flex-basis: 36px;
    height: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default FormUser;
