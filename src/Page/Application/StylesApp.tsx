import styled, { css, keyframes } from 'styled-components';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import { Theme } from './TypesApp';

export const colorIcon = '#646970';

export const colorSwitchON = '#70f324';

export const colorSwitchOFF = '#d6d4d4';

export const colorPinned = '#3361cc';

export const themeDark: Theme = {
  colorIconSelect: '#ffffff',
  colorText: '#ffffff',
  colorTextNote: '#ffffff',
  backgroundColor: '#1d2327',
  colorBorder: '#2c3338',
  backgroundTag: '#3c434a',
  colorTag: '#a7aaad',
  backgroundHoverTag: 'rgba(51, 97, 204, 0.4)',
  backgroundSelectNote: 'rgba(51, 97, 204, 0.4)',
  backgroundSelectMainOptions: 'rgba(51, 97, 204, 0.4)',
  backgroundHoverNote: '#2c3338',
  backgroundContentModal: 'rgba(0, 0, 0, 0.4)',
  backgroundColorScroll: '#2c3338',
  borderColorScroll: '#5e5e68',
};

export const themeLight: Theme = {
  colorIconSelect: '#3361cc',
  colorText: '#37393b',
  colorTextNote: '#5f6368',
  backgroundColor: '#FFFFFF',
  colorBorder: '#d6d4d4',
  backgroundTag: '#dcdcde',
  colorTag: '#2c3338',
  backgroundHoverTag: '#f6f7f7',
  backgroundSelectNote: '#cfddfd',
  backgroundSelectMainOptions: '#cfddfd',
  backgroundHoverNote: '#f6f7f7',
  backgroundContentModal: 'rgba(255, 255, 255, 0.5)',
  backgroundColorScroll: '#c3c4c7',
  borderColorScroll: '#ffffff',
};

export const scrollbarStyle = css`
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.backgroundColorScroll};
    border-radius: 12px;
    border: 3px solid ${(props) => props.theme.borderColorScroll};
  }
`;

const hoverAnimation = keyframes`
  from {
    opacity: 0.35; 
  }
  to{
    opacity: 1; 
  }
`;

export const HoverText = css`
  background-color: #777777;
  position: absolute;
  font-size: 14px;
  font-weight: normal;
  color: #ffffff;
  padding: 6px 8px;
  border-radius: 5px;
  top: 44px;
  animation: ${hoverAnimation} 0.5s;
`;

export const SidebarNoActive = keyframes`
  0% { margin-left: 0px; }
  100% { margin-left: -328px; }
`;

export const MainActive = keyframes`
  0% { margin-left: -260px; }
  100% { margin-left: 0px; }
`;

export const MainNoActive = keyframes`
  0% { margin-left: 0px; }
  100% { margin-left: -260px; }
`;

export const InfoActive = keyframes`
  0% {  right: 0px; }
  100% { right: 320px; } 
`;

export const InfoNoActive = keyframes`
  0% {  right: 320px; }
  100% { right: 0px; }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

export const IconAnimation = styled(AutorenewIcon)`
  color: ${(props) => props.theme.colorTextNote};
  margin: auto;
  animation: ${rotate} 0.85s linear infinite;
`;

export const Error = styled.p`
  color: ${(props) => props.theme.colorText};
  font-family: inherit;
  font-size: 22px;
  font-weight: 300;
  text-align: center;
  margin: auto;
`;
