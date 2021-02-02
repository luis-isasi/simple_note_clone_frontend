import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${(props) => (props.select ? '#cfddfd' : 'transparent')};
  border: none;
  cursor: pointer;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: flex-end;
  padding: 0px;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: 16px;
  font-family: inherit;
  font-size: 16px;
  font-weight: lighter;
  color: #646970;

  /* border-bottom: 1px solid #d6d4d4; */

  border-bottom: ${(props) => (props.select ? 'none' : '1px solid #d6d4d4')};
  > * {
    margin-right: 16px;
  }
`;
