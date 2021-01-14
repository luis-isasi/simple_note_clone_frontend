import * as React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LinkLogin = (props) => {
  return (
    <Link to="/login" component={LinkRef}>
      {props.children}
    </Link>
  );
};

const LinkRef = React.forwardRef((props, ref) => {
  const onClick = (e) => {
    e.preventDefault();
    props.navigate();
  };

  return (
    <A ref={ref} onClick={onClick}>
      {props.children}
    </A>
  );
});

const A = styled.a`
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #6e7072;
  }
`;
export default LinkLogin;
