import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  height: calc(100vh - 0px);
  &.center {
    justify-content: center;
    flex: 1;
    align-items: center;
  }
`;

export const SideBar = styled.div`
  display: flex;
  flex: 1 1 15em;
  min-width: 15em;
  flex-direction: column;
  background-color: ${(props) => props.theme.themeBackground};
  color: white;
  @media screen and (max-width: 768px) {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    visibility: collapse;
    min-height: 60%;
    max-height: 100%;
    z-index: 1;
    &.active {
      visibility: visible;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  overflow: auto;
  box-shadow: inset rgb(0 0 0 / 6%) 0px 0px 8px 7px;
  &.noshadow {
    box-shadow: none;
    overflow: initial;
  }
  &.nopadding {
    padding: 0;
  }
  background: ${(props) => props.theme.pageBackground};
  @media screen and (max-width: 768px) {
    padding-bottom: 20px;
    display: block;
  }
`;
