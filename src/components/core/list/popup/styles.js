import styled from "styled-components";

export const CloseButton = styled.button`
  background: transparent;
  padding: 0 0.5em;
  font-size: initial;
  margin-right: 0.5em;
  outline: none;
  border: 0px solid #ddd;
  border: 0px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  cursor: pointer;
  height: 30px;
  width: 30px;
  margin-right: 0px;
  padding: 6px;
  background: ${(props) => props.theme.secBackground};
  border-radius: 50%;
  margin-top: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.bgPrimary};
  }
`;
export const Td = styled.div`
  text-align: left;
  padding: 5px 20px;
  position: relative;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  &.no,
  &.name {
    border: 1px solid gray;
  }
  &.has {
    border: 2px solid black;
    cursor: pointer;
  }
  &.no,
  &.has {
    text-align: center;
  }
  &.no svg {
    fill: grey;
  }
  &.name {
    text-overflow: "no-wrap";
  }
  &.actions {
    display: flex;
    justify-content: right;
    overflow-wrap: normal;
    margin-left: auto;
    margin-right: 5px;
    padding: 0;
  }
  &.right {
    text-align: right;
  }
  &:last-child {
    border-bottom: 0 !important;
  }
  .double & {
    &:nth-child(odd) {
      border-right: 1px solid #ccc;
    }
    &:last-child {
      border-bottom: 0 !important;
    }

    &:last-child,
    &:nth-last-child(2):nth-child(odd) {
      /* Apply styles to second-to-last child in last row (odd index) */
      border-bottom: 0 !important;
      /* Add any additional styles here */
    }
    &:first-child,
    &:nth-child(2) {
      border-top: 1px solid #d9d9d9;
    }
  }
  @media (max-width: 768px) {
    &:nth-child(odd) {
      border-right: 0px solid #ccc !important;
    }
    &:last-child:nth-child(odd) {
      border-bottom: 0px solid #d9d9d9 !important;
    }
  }
`;

export const TrBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  &.double {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    &.double {
      display: flex;
    }
  }
`;
export const Title = styled.span`
  margin-right: 5px;
  margin-bottom: 5px;
  color: #838894;
`;
export const Head = styled.span`
  font-weight: bold;
  width: "100%";
  display: flex;
  align-items: "center";
  padding: 5px 15px 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span > svg {
    margin-right: 10px;
  }
`;
export const DataHead = styled.span`
  margin: 10px 5px;
  display: flex;
  align-items: center;
`;
export const DataItem = styled.span`
  font-weight: bold;
  border-radius: 10px;
  text-align: right;
`;
export const TabContainer = styled.div`
  border-radius: 12px;
  background-color: white;
  margin: 1.65em 2em 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  @media (max-width: 768px) {
    margin: 15px 15px 30px;
  }
  && {
    .vertical-menu & {
      margin: 0 30px 30px 0;
    }
  }
  .head {
    width: 100%;
    background-color: rgb(75, 75, 75);
    color: white;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  &.page {
    justify-content: left;
    display: flex;
    flex-flow: wrap;
    gap: 5px;
    padding: 10px;
    background-color: transparent;
  }
`;
