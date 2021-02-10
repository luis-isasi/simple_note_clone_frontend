import styled, { css, keyframes } from 'styled-components';

import AutorenewIcon from '@material-ui/icons/Autorenew';

export const colorIcon = '#3361cc';

export const colorBorder = '#d6d4d4';

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
  font-family: inherit;
  font-size: 22px;
  font-weight: 300;
  text-align: center;
  margin: auto;
`;
