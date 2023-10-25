import styled from "styled-components";
export const Head = styled.div`
  background-color: #464646;
  color: white;
  width: 100%;
  padding: 10px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight:500;
  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    border-left: 1px solid #747474;
  }
  svg {
    margin-left: 5px;
    border: 1px solid;
    border-radius: 50%;
    padding: 5px;
    width: 15px;
    height: 15px;
  }
  i {
    border: 1px solid;
    padding: 2px 5px;
    font-style: normal;
    border-radius: 5px;
    margin-left: 5px;
  }
`;

export const Items = styled.div`
  border: 1px solid rgb(227 227 227);
  width: 100%;
  padding: 0px;
  &:first-child {
    border-bottom-left-radius: 8px;
    .order:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
  &:last-child {
    border-bottom-right-radius: 8px;
    border-left: 0px solid #747474;
    .order:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
`;
