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
  max-width: 100%;
  width: 100%;
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
  background-color: rgb(255, 255, 255);
  color: rgb(255, 255, 255);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -15px;
  margin: auto;
`;
export const Popbar = styled.div`
  position: fixed;
  right: 28px;
  top: 55px;
  border-radius: 10px;
  bottom: auto;
  border: 1px solid lightgray;
  padding: 0px;
  white-space: nowrap;
  z-index: 1001;
  background: white;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: flex-start;
  width: 300px;
  min-height: 200px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 10px 2px;
  .main {
    font-size: 18px;
    margin-top: 30px;
    font-weight: 600;
    text-align: center;
  }
  .sub {
    font-size: 12px;
    text-align: center;
    margin-top: 0px;
  }
`;
export const Top = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: -webkit-fill-available;
  .banner {
    height: 100px;
    margin: 0px;
    background: linear-gradient(90deg, rgb(228, 228, 228) 0%, rgb(186, 188, 187) 35%, rgb(151, 151, 151) 100%);
    position: relative;
    padding: 10px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
  }
`;
export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  background: rgb(228, 228, 228);
  margin: 10px;
  padding: 10px;
  border-radius: 12px;
`;
export const ToggleInput = styled.input`
  opacity: 0;
  width: 100%;
  height: 25px;
  cu span {
    box-shadow: 0 0 1px #2196f3;
  }
`;
export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e7f2f9;
  transition: 0.4s;
  box-shadow: 0 0 1px #2196f3;
  border-radius: 34px;
  &:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    background-color: ${({ disable }) => disable || "white"};
  }

  ${ToggleInput}:checked + &::before {
    transform: translateX(18px);
    background-color: ${({ enable }) => enable || "green"};
  }
`;
export const ToggleSwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  border: 0;
  outline: none;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  min-height: 40px;
  height: 40px;
  width: 70px;
  border-radius: 10px;
  margin: 4px 0px;
  background: white;
  transition: all 1s ease 0s;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  cursor: pointer;
  font-weight: bold;
  &.list {
    margin-right: 0;
  }
`;
export const ToggleSwitch = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.1s;
  border-radius: 10px;
  color: ${({ disable, enable, checked }) => (checked ? (enable ? enable : "green") : disable ? disable : "red")};
  justify-content: center;
  background-color: ${({ checked }) => (checked ? "rgb(204, 204, 204)" : "white")};
  align-items: center;
  display: flex;
  font-size: ${({ checked }) => (checked ? "20px" : "18px")};
  svg {
    left: 4px;
    bottom: 3px;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
