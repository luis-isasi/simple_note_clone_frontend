import styled from 'styled-components';

import { colorIcon } from 'StylesApp';

export const Button = styled.button`
  background-color: ${(props) =>
    props.select
      ? `${props.theme.backgroundSelectMainOptions} !important`
      : 'transparent'};
  border: none;
  cursor: pointer;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: flex-end;
  padding: 0px;

  &:hover {
    background-color: ${(props) => props.theme.backgroundHoverNote};
  }
`;

export const Div = styled.div`
  background-color: transparent !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: 16px;
  font-family: inherit;
  font-size: 16px;
  font-weight: lighter;

  > * {
    margin-right: 16px;
    background-color: transparent !important;
  }

  > span {
    color: ${(props) =>
    props.select
      ? `${props.theme.colorIconSelect} !important`
      : `${colorIcon}`};

    * {
      background-color: transparent !important;
    }
  }

  > p {
    color: ${(props) => props.theme.colorText};
  }

  border-bottom: ${(props) =>
    props.select ? 'none' : `1px solid ${props.theme.colorBorder}`};
`;
