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
  box-shadow: 6px 0px 11px 3px #ededed;
  @media screen and (max-width: 768px) {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    visibility: collapse;
    min-height: 60%;
    max-height: 100%;
    z-index: 1001;
    box-shadow: none;
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
export const ProfileStatus = styled.span`
  font-size: 10px;
  position: absolute;
  right: -2px;
  bottom: -4px;
  margin: 0px !important;
  background: ${(props) => props.color};
  width: 10px;
  height: 10px;
  padding: 2px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
  svg {
    color: white;
  }
`;

export const ProfileIcon = styled.div`
  position: relative;
  background-color: rgb(255, 69, 0);
  color: rgb(255, 255, 255);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Popbar = styled.div`
  position: absolute;
  right: 10px;
  top: 40px;
  border: 1px solid lightgray;
  padding: 10px;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 1001;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 200px;
  min-height: 200px;
  .main {
    font-size: 15px;
    margin-top: 10px;
    font-weight: 600;
  }
  .sub {
    font-size: 12px;
    margin-top: 5px;
  }
`;
export const Top = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
`;
