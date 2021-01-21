import { css, keyframes } from 'styled-components';

export const colorIcon = css`
  color: #3361cc;
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
