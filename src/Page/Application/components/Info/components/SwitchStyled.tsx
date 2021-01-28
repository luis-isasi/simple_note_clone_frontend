import styled from 'styled-components';

export const Switch = styled.div`
  > input {
    display: none;
  }

  > label {
    cursor: pointer;
    display: block;
    position: relative;
    width: 26px;
    height: 14px;
    padding: 2px;
    border-radius: 24px;
    background-color: #d6d4d4;

    &:before {
      content: '';
      position: absolute;
      margin: auto;
      left: 2px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #ffffff;
      transition: all 0.3s;
    }
  }
`;

export const Input = styled.input.attrs((props) => ({
  type: 'checkbox',
  id: props.id,
}))`
  display: none;

  &:checked + label {
    background-color: #70f324;
  }

  &:checked + label:before {
    left: 14px;
  }
`;

export const Label = styled.label.attrs((props) => ({
  htmlFor: props.htmlFor,
}))`
  cursor: pointer;
  display: block;
  position: relative;
  width: 26px;
  height: 14px;
  padding: 2px;
  border-radius: 24px;
  background-color: #d6d4d4;

  &:before {
    content: '';
    position: absolute;
    margin: auto;
    left: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #ffffff;
    transition: all 0.3s;
  }
`;
