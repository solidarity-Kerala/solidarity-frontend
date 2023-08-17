import styled from "styled-components";
export const Table = styled.div`
  border-collapse: collapse;
  /* width: calc(100% + 60px); */
  font-family: Arial, sans-serif;
  margin-bottom: auto;
  border-top: 0px solid #d9d9d9;
  &.record {
    border-top: 0px solid #d9d9d9;
  }
  &.double {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 0px solid #d9d9d9;
  }
  @media (max-width: 768px) {
    &.double {
      grid-template-columns: auto;
    }
  }
  &.auto {
    width: auto;
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 15px 8px 10px;
  background-color: #ddedeb;
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
  &.actions {
    display: flex;
    justify-content: right;
    padding-right: 20px;
  }
`;

export const Tr = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.border};
  display: flex;
  margin: 0em 2em 0px;
  padding: 10px;
  background-color: ${(props) => props.theme.background};
  && {
    .popup-child & {
      box-shadow: rgb(167 167 167 / 26%) 0px 0px 12px 0px;
    }
  }
  &:hover h4 {
    color: ${(props) => props.theme.themeForegound};
  }
  flex-direction: column;
  /* padding: 5px 26px; */
  padding-bottom: 12px;
  &:first-child {
    border-top: 0px solid ${(props) => props.theme.border};
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }
  &:last-child {
    border-bottom: 0px solid ${(props) => props.theme.border};
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .double.table & {
    border-radius: 0px;
    &:first-child {
      border-top-left-radius: 12px;
    }
    &:nth-child(2) {
      border-top-right-radius: 12px;
    }
    &:nth-child(odd) {
      border-right: 1px solid ${(props) => props.theme.border};
      margin-right: 0;
    }
    &:nth-child(even) {
      margin-left: 0;
    }
    &:last-child {
      border-bottom: 0;
    }

    &:nth-last-child(2):nth-child(odd) {
      /* Apply styles to second-to-last child in last row (odd index) */
      border-bottom: 0;
      border-bottom-left-radius: 12px;

      /* Add any additional styles here */
    }
    &:nth-last-child(1):nth-child(even) {
      border-bottom-right-radius: 12px;
    }
    &:nth-last-child(2):nth-child(even) {
      border-bottom-right-radius: 12px;
    }
    &:nth-last-child(1):nth-child(odd) {
      border-bottom-left-radius: 12px;
    }
    &:last-child {
      border-bottom-right-radius: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 1em 1em 0.5em;
    margin: 0em 1em 0px;

    .double.table & {
      border-radius: 0;
      &:nth-last-child(2):nth-child(odd) {
        /* Apply styles to second-to-last child in last row (odd index) */
        border-bottom: 1px solid ${(props) => props.theme.border};
        border-bottom-left-radius: 0px;

        /* Add any additional styles here */
      }
      &:nth-child(2) {
        border-top-right-radius: 0px;
      }
      &:nth-last-child(1):nth-child(even) {
        border-bottom-right-radius: 0px;
      }
      &:nth-last-child(2):nth-child(even) {
        border-bottom-right-radius: 0px;
      }
      &:nth-last-child(1):nth-child(odd) {
        border-bottom-left-radius: 0px;
      }
      &:nth-child(odd) {
        border-right: 0px solid ${(props) => props.theme.border};
        margin: 0em 1em 0px !important;
      }
      &:nth-child(even) {
        margin: 0em 1em 0px !important;
      }
      &:first-child {
        border-top: 0px solid ${(props) => props.theme.border};
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
      }
      &:last-child {
        border-bottom: 0px solid ${(props) => props.theme.border};
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
      }
    }
  }
  /* box-shadow: rgb(167 167 167 / 26%) 0px 0px 12px 0px; */
  &:hover {
    /* background-color: #ddedeb; */
    box-shadow: 0px 4px 12px 0px rgba(136, 173, 74, 0.25);

    /* border: 1px solid ${(props) => props.theme.border}; */
  }
  &.single {
    padding: 0;
    margin: 0;
  }
  &.single:hover {
    background-color: initial;
    box-shadow: none;
    h4 {
      color: initial;
    }
  }
`;
export const Td = styled.div`
  text-align: left;
  padding: 10px 5px;
  position: relative;
  font-size: 14px;
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
`;

export const TrBody = styled.div`
  display: flex;
  flex-flow: wrap;
  &.small {
    font-size: 13px;
  }
  &.single {
    padding: 15px 17px 15px 26px;
  }
`;
export const Title = styled.span`
  margin-right: 5px;
  margin-bottom: 5px;
  color: #838894;
  &:after {
    content: " :";
  }
`;
export const Head = styled.h4`
  font-weight: bold;
  width: "100%";
  display: flex;
  align-items: "center";
  margin: 0;
  padding: 0;
  span {
    font-size: 16px;
  }
  font-size: 16px;
  cursor: pointer;
  svg {
    margin-right: 10px;
  }
`;
export const DataItem = styled.span`
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: 500;
  border: 1px solid #ddd;
  p {
    text-align: center;
    white-space: pre-line;
    display: contents;
  }
`;
export const Button = styled.button`
  color: ${(props) => props.theme.pageForeground};
  border: none;
  padding: 6px 12px;
  margin-right: 8px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  &.add {
    background-color: #4caf50;
  }
  &.menu {
    padding: 10px;
    margin-right: 0;
    text-align: left;
  }
  &.menu:last-child {
    margin-bottom: 0px;
  }
  &.edit {
    background-color: ${(props) => props.theme.pageBackground};
  }
  &.delete {
    background-color: red;
    color:white;
  }
  &:hover {
    transform: scale(1.1);
    transition: 0.2s ease-in-out;
  }
  svg {
    fill: white;
    margin-right: 5px;
    height: 0.9em;
  }
  @media (max-width: 768px) {
    svg {
      margin-left: 0px;
    }
  }
`;
export const Count = styled.div`
  padding: 1em 2em;
  @media screen and (max-width: 768px) {
    padding: 1em 1em 0.5em;
  }
  text-align: right;
  height: 25px;
  justify-content: flex-end;
  display: flex;
  button:nth-child(2) {
    margin-left: 1em;
  }
`;
export const ArrowButton = styled.button`
  background: transparent;
  padding: 0em;
  margin-right: 0.5em;
  outline: none;
  border: 0px solid #ddd;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    color: ${(props) => props.theme.bgPrimary};
  }
`;
export const ButtonPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 2em 0.5em;
  justify-content: space-between;
  margin-bottom: 0.5em;
  svg {
    background-color: transparent;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    padding: 1em 1em 0.5em;
  }
`;
export const AddButton = styled.button`
  padding: 12px;
  border-radius: 12px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background: ${(props) => props.theme.background};
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  padding: 12px;
  margin-right: 0em;
  outline: none;
  cursor: pointer;
  && {
    .popup-child & {
      color: ${(props) => props.theme.secForeground};
      background: ${(props) => props.theme.secBackground};
    }
  }
  &:hover {
    color: ${(props) => props.theme.bgPrimary};
  }
  & > svg {
    margin-right: 10px;
  }
`;
export const FilterBox = styled.div`
  flex-direction: row;
  display: flex;
`;
export const Filter = styled.button`
  background: transparent;
  padding: 0 0.5em;
  font-size: initial;
  margin-right: 0.5em;
  outline: none;
  border: 0px solid #ddd;
  border: 0px solid #ddd;
  cursor: pointer;
  height: 40px;
  width: 40px;
  margin-right: 10px;
  padding: 12px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.foreground};
  border-radius: 12px;
  margin-top: 4px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.bgPrimary};
  }
  && {
    .popup-child & {
      color: ${(props) => props.theme.secForeground};
      background: ${(props) => props.theme.secBackground};
    }
  }
`;
export const Filters = styled.div`
  margin-right: auto;
  display: flex;
  max-width: 80%;
  @media (max-width: 768px) {
    flex-flow: wrap;
    max-width: 100%;
    margin-bottom: 10px;
  }
`;
export const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 30px;
  margin-right: 10px;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  span {
    box-shadow: 0 0 1px #2196f3;
  }
`;
export const NoData = styled.div`
  padding: 10px;
  border: 1px solid #ddedeb;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 100px;
`;
export const Img = styled.img`
  height: 50px;
  object-fit: cover;
  width: 100px;
`;
export const ScrollLayout = styled.div`
  /* overflow: auto; */
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
    background-color: red;
  }

  ${ToggleInput}:checked + &::before {
    transform: translateX(18px);
    background-color: green;
  }
`;
export const More = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  right: 0;
  margin-top: 5px;
  &.active,
  &:hover {
    color: white;
    background-color: #77998e;
  }
`;
export const Actions = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: column;
  border-radius: 10px;
  div {
    margin: 0px 0px 5px 0;
    margin-right: 10px;
    text-decoration: none;
    cursor: pointer;
    opacity: 0.5;
  }

  div:last-child {
    margin-right: 0px;
  }
  div.active {
    margin-right: 10px;
    text-decoration: none;
    cursor: pointer;
    opacity: 1;
  }
  @media screen and (max-width: 768px) {
    div {
      color: black;
    }
    div.active {
      color: #198ad6;
    }
  }
`;

export const ToolTipContainer = styled.div`
  display: flex;
`;
export const IconBox = styled.span`
  padding-top: 5px;
  &.display {
    padding-top: 0px;
    border: 1px solid;
    display: flex;
    height: 20px;
    width: 20px;
    justify-content: center;
    align-items: center;
  }
`;
