import styled from "styled-components";

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  margin-bottom: auto;
  th {
    background-color: ${(props) => props.theme.pageBackground};
  }
  tr:hover {
    background-color: ${(props) => props.theme.pageBackground};;
  }
  &.auto {
    width: auto;
  }
  &&.plain {
    tr {
      border: 1px solid;
    }
  }
`;
export const DataLayout = styled.div`
  padding: 25px;
`;
export const Th = styled.th`
  text-align: left;
  padding: 15px 8px 10px;
  white-space: nowrap;
  color: #444;
  font-weight: bolder;
  border-radius: 0px;
  :first-child {
    border-top-left-radius: 12px;
  }
  :last-child {
    border-top-right-radius: 12px;
  }
  && {
    .plain & {
      background-color: transparent;
    }
  }

  &.actions {
    display: flex;
    justify-content: right;
    padding-right: 20px;
  }
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #ccc;
  &:hover {
    background-color: #ddedeb;
    border-radius: 12px;
  }
`;

export const Td = styled.td`
  text-align: left;
  padding: 8px;
  height: 30px;
  position: relative;
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
  }
  &.right {
    text-align: right;
  }
`;
