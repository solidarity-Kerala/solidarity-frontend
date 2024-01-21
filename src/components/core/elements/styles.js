import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  gap: 10px;
  &.left {
    justify-content: flex-start;
  }
  &.right {
    justify-content: flex-end;
  }
  &.center {
    justify-content: center;
  }
`;
export const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 0;
  height: 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  z-index: 1;
  border-radius: 10px;
  margin: 5px 0;
  &.custom {
    width: max-content;
    margin: 0px 0;
  }
  &.left {
    margin: 0;
    margin-right: auto;
  }
  &.right {
    margin: 0;
    margin-left: auto;
  }
  &.center {
    margin: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  font-weight: bold;
  gap:10px;
  display:flex;
  align-items:center;
  &.true {
    background-color: #ccc;
    font-weight: normal;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px inset;
    background: ${(props) => props.theme.theme};
    color: ${(props) => props.theme.themeForeground};
  }
  border: none;
  font-size: 14px;
  margin-bottom: 0px;
  border-radius: 10px;
  &.nomargin {
    margin: 0;
  }
  cursor: pointer;
  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
`;
export const SwitchButton = styled.div`
  border: 0;
  outline: none;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  min-height: 40px;
  height: 40px;
  border-radius: 10px;
  margin: 4px 0px;
  transition: all 1s ease 0s;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  cursor: pointer;
  font-weight: bold;
  text-wrap: nowrap;
  padding: 0 15px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  &.custom {
    margin: auto;
    margin-right: 0px;
  }
    &.left {
    margin: 0;
    margin-right: auto;
  }
  &.right {
    margin: 0;
    margin-left: auto;
  }
  &.center {
    margin: 0;
    margin-left: auto;
    margin-right: auto;
  }
  span {
    transition: all 1s ease 0s;
    background: white;
    color: black;
    padding: 0px;
    border-radius: 10px;
    top: 45px;
    z-index: 100;
    font-size: 12px;
  }
  background-color: ${({ active, enableBg }) => (active ? enableBg ?? "green" : "white")};
  color: ${({ active, enableColor }) => (active ? enableColor ?? "white" : "grey")};
  svg {
    font-size: 16px;
    /* transform: ${({ active }) => (active ? "scale(1.2)" : "scale(1)")}; */
  }

  &:hover span {
    display: flex;
    width: auto;
  }
`;
