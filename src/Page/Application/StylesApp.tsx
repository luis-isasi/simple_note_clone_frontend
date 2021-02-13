import styled, { css, keyframes } from 'styled-components';

import { USER_SESSION_KEY } from 'Constants';

import AutorenewIcon from '@material-ui/icons/Autorenew';

const user = localStorage.getItem(USER_SESSION_KEY);

const { Theme } = JSON.parse(user);

const theme = Theme;

export const colorIcon = '#646970';

export const colorPinned = '#3361cc';

export const colorIconSelect = theme === 'ligth' ? '#3361cc' : '#ffffff';

export const colorText = theme === 'ligth' ? '#37393b' : '#ffffff';

export const colorTextNote = theme === 'ligth' ? '#5f6368' : '#ffffff';

//DARK
export const backgroundColor = theme === 'ligth' ? '#FFFFFF' : '#1d2327';
//LIGTH
// export const backgroundColor = '#FFFFFF';

//DARK
export const colorBorder = theme === 'ligth' ? '#d6d4d4' : '#2c3338';
//LIGTH
// export const colorBorder = '#d6d4d4';

//DARK
export const backgroundTag = theme === 'ligth' ? '#dcdcde' : '#3c434a';
//LIGTH
// export const backgroundTag = '#dcdcde';

//DARK
export const colorTag = theme === 'ligth' ? '#dcdcde' : '#a7aaad';
//LIGTH
// export const colorTag = '#dcdcde';

//DARK
export const backgroundHoverTag =
  theme === 'ligth' ? '#f6f7f7' : 'rgba(51, 97, 204, 0.4)';
//LIGTH
// export const backgroundHoverTag = '#f6f7f7';

//DARK
export const backgroundSelectNote =
  theme === 'ligth' ? '#cfddfd' : 'rgba(51, 97, 204, 0.4)';
//LIGTH
// export const backgroundSelectNote = '#cfddfd';

//DARK
export const backgroundSelectMainOptions =
  theme === 'ligth' ? '#cfddfd' : 'rgba(51, 97, 204, 0.4)';
//LIGTH
// export const backgroundSelectNote = '#cfddfd';

//DARK
export const backgroundHoverNote = theme === 'ligth' ? '#f6f7f7' : '#2c3338';
//LIGTH
// export const backgroundHoverNote = '#f6f7f7';

export const backgroundContentModal =
  theme === 'ligth' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)';

export const backgroundColorScroll = theme === 'ligth' ? '#c3c4c7' : '#2c3338';

export const borderColorScroll = theme === 'ligth' ? '#ffffff' : '#5e5e68';

export const scrollbarStyle = css`
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${backgroundColorScroll};
    border-radius: 12px;
    border: 3px solid ${borderColorScroll};
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
  margin: auto;
  animation: ${rotate} 0.85s linear infinite;
`;

export const Error = styled.p`
  color: ${colorText};
  font-family: inherit;
  font-size: 22px;
  font-weight: 300;
  text-align: center;
  margin: auto;
`;
