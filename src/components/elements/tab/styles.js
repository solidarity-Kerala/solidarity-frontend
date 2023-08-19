import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 0px 0px;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const TabHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 0;
  align-items: flex-end;
  height: 60px;
  justify-content: flex-start;
  overflow: auto;
  margin: 0px 30px 0;
  border-bottom: 1px solid rgb(208, 208, 208);
`;

export const Tab = styled.div`
  padding: 0px;
  /* border-top: 1px solid #d0d0d0; */
  display: none;
  /* box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px; */
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  flex-direction: column;
  ${(props) =>
    props.active &&
    `
    display: flex;
  `}
`;

export const TabLink = styled.div`
  cursor: pointer;
  padding: 10px;
  flex: 1 1 50%;
  background-color: rgb(255, 255, 255);
  color: ${(props) => props.theme.pageForeground};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 30px;
  border-left: 1px solid #c4d7d6;
  flex: inherit;
  min-width: 60px;
  &:first-child {
    border-left: 1px solid rgb(181 175 175 / 38%);
    border-top-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
  }
  &.active {
    background-color: ${(props) => props.theme.pageForeground};
    color: ${(props) => props.theme.pageForeground};
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
    font-weight: 600;
    font-size: 16px;
    z-index: 1001;
    height: 35px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  @media (max-width: 768px) {
    white-space: nowrap;
    flex: none;
  }
`;
