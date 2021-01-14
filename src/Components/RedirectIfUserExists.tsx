import * as React from 'react';

import { Redirect } from 'react-router-dom';

import { useAppContext } from '../Context/App';

const RedirectIfUserExists = ({ children, ...restProps }) => {
  const userData = useAppContext();

  if (userData.user) {
    return <Redirect to="/app" />;
  }

  return React.cloneElement(children, restProps);
};

export default RedirectIfUserExists;
