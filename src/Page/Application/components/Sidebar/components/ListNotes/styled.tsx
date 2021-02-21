import styled from 'styled-components';
import { colorPinned, scrollbarStyle } from 'StylesApp';

export const ContentListNotes = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Ul = styled.ul`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-flow: column;
  overflow-y: auto;

  ${scrollbarStyle}
`;

export const BtnNote = styled.button`
  background-color: ${(props) =>
    props.selected
      ? `${props.theme.backgroundSelectNote} !important`
      : 'transparent'};

  cursor: pointer;
  border: none;
  height: 64px;
  min-height: 64px;
  width: 100%;
  padding: 0px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: flex-start;

  &:hover {
    background-color: ${(props) =>
    props.selected ? null : `${props.theme.backgroundHoverNote}`};
  }

  .pinned {
    background-color: transparent;
    min-width: 26px;
    height: 100%;
    color: ${colorPinned};
    margin: 4px 0px 0px 4px;

    > * {
      transform: rotate(45deg);
      font-size: 18px;
      background-color: transparent;
    }
  }

  .noteText {
    box-sizing: border-box;
    background-color: transparent !important;
    height: 100%;
    flex-grow: 1;
    overflow: hidden;
    border-bottom: 1px solid ${(props) => props.theme.colorBorder};
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    > .animationEditNote {
      background-color: transparent !important;
      position: absolute;
      top: 2px;
      right: 2px;

      * {
        background-color: transparent !important;
        color: ${(props) => props.theme.colorText};
        font-size: 18px;
      }
    }

    > p {
      background-color: transparent !important;
      width: 100%;
      font-family: inherit;
      font-size: 14px;
      font-weight: bold;
      color: ${(props) => props.theme.colorTextNote};
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;

export const NewNote = styled.span`
  background-color: transparent !important;
  color: #918f90;
`;

export const DivNoNotes = styled.div`
  margin: auto;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  & {
    color: ${(props) => props.theme.colorText};
  }

  > div {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
`;

export const NoNotes = styled.p`
  font-family: inherit;
  font-size: 22px;
  font-weight: 300;
  margin: 8px 0px;
`;

export const BtnEmptyTrash = styled.button`
  background-color: transparent;
  position: relative;
  bottom: 0px;
  min-height: 58px;
  width: 100%;
  color: #e65054;
  border: none;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  border-top: 1px solid ${(props) => props.theme.colorBorder};
`;
