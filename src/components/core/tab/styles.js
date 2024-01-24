import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  &.vertical-menu {
    flex-direction: row;
    align-items: flex-start;
    position: relative;
    min-height: 75vh;
  }
  &.horizontal {
    > .horizontal .tab {
      margin: 1.65em 2em 0px;
    }
    > .menu > div{
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px !important;
      border-radius: 12px;
      width:inherit !important;
    }
  }
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const TabHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 0;
  align-items: flex-end;
  justify-content: flex-start;
  overflow: auto;
  margin: 0px;
  gap: 5px;
  padding: 5px;
  margin: 15px 22px 0px 25px;
  &.vertical-menu {
    padding: 20px 0px 20px;
    margin: 20px 20px 0;
    border-radius: 12px;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    gap: 5px;
    min-width: 200px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  }
  &.custom {
    margin: 0;
  }
  @media (max-width: 768px) {
    margin: 0px 15px;
  }
`;
export const TabContents = styled.div`
  flex: auto;
  width: 100%;
  margin-bottom: 30px;
  &.vertical-menu {
    display: flex;
    width: calc(100% - 260px);
    padding: 20px;
    position: absolute;
    left: 230px;
    overflow: auto;
    margin-bottom: 0;
    bottom: 0;
    top: 0;
  }
`;
export const Tab = styled.div`
  padding: 0px;
  /* border-top: 1px solid #d0d0d0; */
  display: none;
  /* box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px; */
  border-radius: 10px;
  flex-direction: column;
  &.custom {
    margin: 10px 0px 0px;
    padding: 0px;
  }
  &.vertical-menu {
    flex: auto;
  }
  ${(props) =>
    props.active &&
    `
    display: flex;
  `}
`;

export const TabLink = styled.div`
  cursor: pointer;
  padding: 5px 15px;
  flex: 1 1 50%;
  background-color: rgb(255, 255, 255);
  color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  height: 30px;
  flex: inherit;
  gap: 10px;
  /* min-width: 60px;  */
  white-space: nowrap;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  transition: all 0.1s ease-in;
  && {
    .vertical-menu & {
      width: -webkit-fill-available;
      justify-content: left;
      text-align: left;
      box-shadow: none;
      min-height: 30px;
      padding: 5px 20px;

      svg {
        min-width: 20px;
      }
    }
  }
  :hover {
    /* transition: padding 0s ease-in; */
    /* font-weight: bold; */
    /* padding: 5px 13.1px; */
  }
  &:first-child {
    border-radius: 10px;
  }
  &:last-child {
    border-radius: 10px;
  }
  &.active {
    background-color: ${(props) => props.theme.pageForeground};
    color: ${(props) => props.theme.theme};
    font-weight: bold;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  && {
    .vertical-menu & {
      &.active {
        box-shadow: rgba(0, 0, 0, 0.1) 5px 0px 8px 0px;
      }
      border-radius: 0;
    }
  }
  @media (max-width: 768px) {
    white-space: nowrap;
    flex: none;
  }
`;
