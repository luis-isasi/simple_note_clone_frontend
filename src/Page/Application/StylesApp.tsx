import { css, keyframes } from 'styled-components';

export const colorIcon = '#3361cc';

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
  0% { margin-right: -328px; }
  100% { margin-right:  0px; }
`;

export const InfoNoActive = keyframes`
  0% { margin-right: 0px; }
  100% { margin-right: -328px; }
`;
