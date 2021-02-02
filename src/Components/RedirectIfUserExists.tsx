import * as React from 'react';

import { Redirect } from 'react-router-dom';

import { useSessionContext } from '../Context/AppSession';

const RedirectIfUserExists = ({ children, ...restProps }) => {
  const appSession = useSessionContext();

  if (appSession.user) {
    return <Redirect to="/app" />;
  }

  return React.cloneElement(children, restProps);
};

export default RedirectIfUserExists;
