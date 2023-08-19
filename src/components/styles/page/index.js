import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
`;

export const TabHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 0;
  align-items: flex-end;
  height: 60px;
`;

export const Tab = styled.div`
  padding: 0px;
  background-color: white;
  display: none;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
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
  background-color: #d5e4ed;
  color: #838384;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 30px;
  &:first-child {
    border-top-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
  }
  &.active {
    background-color: #ffffff;
    color: #1381c5;
    height: 40px;
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

export const Section = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  flex: 1 1 100%;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  padding: 0;
  margin-bottom: 1em;
  margin: 1em;
  border-radius: 10px;
  background: #f3f8fb;
  padding-bottom: 10px;
`;
export const PlainSection = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 1em;
  margin-bottom: 1em;
`;
