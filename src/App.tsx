import * as React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './Page/Home';
import Login from './Page/Login';
import PageDefault from './Page/PageDefault';
import Signup from './Page/Signup';
import { CssReset } from './GlobalStyle';

import RedirectIfUserExists from './Components/RedirectIfUserExists';

import { AppContextProvider } from './Context/App';

import NoteTest from './NoteTest';
import { USER_SESSION_KEY } from './Constants';

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0px;
    font-family: 'Roboto', sans-serif;
    ${CssReset}
  }
`;

const httpLink = createHttpLink({
  uri: 'https://simple-note-clone-backend.herokuapp.com/graphql/',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  //obtenemos el token de nuestro localStorage
  const user = localStorage.getItem(USER_SESSION_KEY);
  const token = user ? JSON.parse(user).token : '';

  return {
    headers: {
      ...headers,
      // Authorization: token,
    },
  };
});

const client = new ApolloClient({
  // uri: 'https://simple-note-clone-backend.herokuapp.com/graphql ',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <AppContextProvider>
      <ApolloProvider client={client}>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <RedirectIfUserExists>
                <Login />
              </RedirectIfUserExists>
            </Route>
            <Route exact path="/register">
              <RedirectIfUserExists>
                <Signup />
              </RedirectIfUserExists>
            </Route>
            <Route exact path="/notetest">
              <NoteTest />
            </Route>
            <Route>
              <PageDefault />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </AppContextProvider>
  );
};

export default App;
