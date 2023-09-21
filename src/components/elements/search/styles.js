import styled from "styled-components";

export const SearchInput = styled.div`
  position: relative;
  animation: ease-in-out;
  animation-duration: 0.2s;
  margin-bottom: 5px;
  margin-top: 4px;
 
  &.select {
    top: 0;
    z-index: 1;
    display: inherit;
    position: sticky;
    top: 0;
  }
  input {
    box-sizing: border-box;
    outline: none !important;
    border: 0px solid Black;
    height: 40px;
    margin: 0px 0;
    padding: 13px 10px;
    padding-left: 1em;
    font-weight: 700;
    box-shadow: none;
    transition: all 0.2s ease-out 0s;
    color: ${(props) => props.theme.foreground};
    background: ${(props) => props.theme.background};
    margin-right: 10px;
    border-radius: 12px;
    width: 40px;
    padding-left: 30px;
    &:focus {
      width: 200px;
      border-radius: 10px;
      color: ${(props) => props.theme.foreground};
      padding-left: 45px;
    }
  }
  &.sticky {
    position: sticky;
    top: 50px;
  }
  && {
    /* .popup-child & {
        input {
          color: ${(props) => props.theme.secForeground};
          background: ${(props) => props.theme.secBackground};
        }
      } */
  }
  &.active input {
    width: 200px;
    border-radius: 10px;
    color: ${(props) => props.theme.foreground};
    padding-left: 45px;
  }
  svg {
    position: absolute;
    left: 13px;
    top: 12px;
    pointer-events: none;
  }
  &.menu {
    margin-left: 0;
    border-bottom: 1px solid rgb(239, 237, 237);
    position: sticky;
    top: 0px;
    z-index: 1;
    margin-bottom: 0;
  }
  &.menu input {
    width: 100% !important;
    padding-left: 55px;
    border-radius: 0;
  }
  &.menu svg {
    left: 20px;
  }
  &.select {
    margin: 5px 5px;
  }
`;
