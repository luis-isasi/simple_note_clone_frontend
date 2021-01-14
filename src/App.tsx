import * as React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Home from './Page/Home';
import Login from './Page/Login';
import { CssReset } from './GlobalStyle';

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
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Router extac path="/login">
            <Login />
          </Router>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;