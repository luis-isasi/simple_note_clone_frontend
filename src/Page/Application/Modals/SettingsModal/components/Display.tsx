import * as React from 'react';

import styled from 'styled-components';

import { colorSwitchON, colorSwitchOFF } from 'StylesApp';

const Display = ({ theme, changeTheme }) => {
  const [light, setLight] = React.useState(() =>
    theme === 'Light' ? true : false
  );
  const [dark, setDark] = React.useState(() =>
    theme === 'Dark' ? true : false
  );

  //CHANGE DARKMODE OR LIGHTMODE
  const onClick = (mode) => () => {
    if (mode === 'Light') {
      setDark(false);
      setLight(true);
    }

    if (mode === 'Dark') {
      setLight(false);
      setDark(true);
    }

    changeTheme(mode);
  };

  return (
    <Div>
      <span>THEME</span>
      <div className="content-themes">
        <button className="control-light" onClick={onClick('Light')}>
          <p>Light</p>
          <div className="control-input-theme">
            <input
              type="radio"
              className="regular-radio"
              id="theme-light"
              checked={light}
            />
            <label htmlFor="theme-light"></label>
          </div>
        </button>
        <button className="control-dark" onClick={onClick('Dark')}>
          <p>Dark</p>
          <div className="control-input-theme">
            <input
              type="radio"
              className="regular-radio"
              id="theme-dark"
              checked={dark}
            />
            <label htmlFor="theme-dark"></label>
          </div>
        </button>
      </div>
    </Div>
  );
};

//--------------STYLED------------

const Div = styled.div`
  height: 264px;
  width: 90%;
  max-width: 350px;

  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  * {
    font-family: inherit;
    color: ${(props) => props.theme.colorText};
    background-color: ${(props) => props.theme.backgroundColor} !important;
  }

  > span {
    font-size: 14px;
    margin: 4px 0px;
  }

  > .content-themes {
    box-sizing: border-box;
    width: 100%;
    max-width: 350px;
    height: auto;
    border: 1px solid ${(props) => props.theme.colorBorder};

    display: flex;
    flex-direction: column;

    > * {
      box-sizing: border-box;
      border: none;
      border-bottom: 1px solid ${(props) => props.theme.colorBorder};
      font-size: 16px;
      height: 42px;
      width: 100%;
      padding: 0px 12px;
      cursor: pointer;
      background-color: transparent;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      > p {
        color: ${(props) => props.theme.colorText};
      }

      > .control-input-theme {
        > .regular-radio {
          display: none;

          &:checked + label {
            background-color: ${colorSwitchON} !important;
          }
        }

        > .regular-radio + label {
          -webkit-appearance: none;
          background-color: ${colorSwitchOFF} !important;
          border-radius: 10px;
          width: 100%;
          display: inline-block;
          position: relative;
          width: 16px;
          height: 16px;
        }
      }
    }

    > .control-ligth {
    }

    > .control-dark {
    }
  }
`;

export default Display;
