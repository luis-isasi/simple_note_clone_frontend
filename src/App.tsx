import * as React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Home from './Page/Home';
import Login from './Page/Login';
import PageDefault from './Page/PageDefault';
import Signup from './Page/Signup';
import { CssReset } from './GlobalStyle';

import RedirectIfUserExists from './Components/RedirectIfUserExists';

import { AppContextProvider } from './Context/App';

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0px;
    font-family: 'Roboto', sans-serif;
    ${CssReset}
  }
`;

const client = new ApolloClient({
  uri: 'https://simple-note-clone-backend.herokuapp.com/graphql',
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
