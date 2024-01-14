import styled from "styled-components";
export const Table = styled.div`
  border-collapse: collapse;
  display: flex;
  flex-direction: column;
  row-gap: 0px;
  font-family: Arial, sans-serif;
  margin-bottom: auto;
  border-top: 0px solid #d9d9d9;
  width: 100%;
  width: -webkit-fill-available;
  padding: 10px 0;
  &.record {
    border-top: 0px solid #d9d9d9;
    padding: 0px 0px;
  }
  &.double {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 0px solid #d9d9d9;
    column-gap: 0px;
    row-gap: 0px;
  }
  &.no-data {
    grid-template-columns: auto;
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
export const ProfileImage = styled.div`
  min-width: 50px;
  max-width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 12px;
  background: #ececec;
  font-size: 10px;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  /* border-bottom: 1px solid ${(props) => props.theme.border}; */
  display: flex;
  margin: 0em 2em 0px;
  padding: 10px;
  background-color: ${(props) => props.theme.background};
  border-radius: 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  cursor: pointer;
  && {
    /* .popup-child & {
      box-shadow: rgb(167 167 167 / 26%) 0px 0px 12px 0px;
    } */
  }
  && {
    .show-filter & {
      margin: 0em 2em 0 10px;
    }
  }
  &:hover h4 {
    color: ${(props) => props.theme.themeForegound};
  }
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
      border-right: 0px solid ${(props) => props.theme.border};
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
  /* &:hover {
    transform: scale(1.005);
    transition: all 0.4s;
    border-radius:12px !important;
    z-index: 1000;
  } */
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
    box-shadow: 0px 4px 12px 0px rgba(${(props) => props.theme.theme}, 1);

    /* border: 1px solid ${(props) => props.theme.border}; */
  }
  &.single {
    padding: 0;
    margin: 0;
    margin: 20px 30px 30px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px !important;
    @media (max-width: 768px) {
      margin: 10px 15px 30px;
    }
  }
  &.single:hover {
    /* background-color: initial; */
    box-shadow: none;
    h4 {
      color: initial;
    }
  }
`;
export const Td = styled.div`
  text-align: left;
  padding: 5px 5px 0;
  position: relative;
  font-size: 14px;
  &.disabled {
    display: none;
  }
  &.custom {
    padding: 0px 5px 5px;
  }
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
    display: flex;
    justify-content: right;
    overflow-wrap: normal;
    margin-left: auto;
    margin-right: 5px;
    padding: 0px 0px 0px 5px;
    position: sticky;
    right: 0;
    bottom: 0;
    background: #ffffffe0;
  }
  &.right {
    text-align: right;
  }
  :last-child span:last-child::after {
    display: none;
  }
`;

export const TrBody = styled.div`
  display: flex;
  flex-flow: wrap;
  &.small {
    font-size: 13px;
  }
  &.single {
    padding: 10px 15px 10px 15px;
  }
  &.actions {
    display: flex;
    justify-content: right;
    margin: 5px;
  }
  @media (max-width: 768px) {
    &.nowrap {
      flex-flow: initial;
      margin-bottom: 5px;
    }
    &.actions {
      display: flex;
      justify-content: left;
      margin-top: 5px;
    }
  }
`;
export const Title = styled.span`
  margin-right: 5px;
  margin-bottom: 5px;
  color: #838894;
  font-size: 13px;
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
  padding: 0;
  font-size: 15px;
  /* border: 1px solid #ddd; */
  p {
    text-align: center;
    white-space: pre-line;
    display: contents;
  }
  &:after {
    content: " |";
    margin-left: 5px;
    color: #bcbcbc;
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
    color: white;
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
  text-wrap: nowrap;
  button:nth-child(2) {
    margin-left: 1em;
  }
`;
export const ArrowButton = styled.button`
  border: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  outline: none;
  cursor: pointer;
  font-weight: bold;
  text-wrap: nowrap;
  position: relative;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  transition: all 1s ease 0s;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  padding: 0 15px;
  min-height: 40px;
  height: 40px;
  width: 50px;
  border-radius: 10px;
  margin: 4px 0px;
  background-color: ${(props) => props.theme.pageBackground};
  &:hover {
    color: ${(props) => props.theme.bgPrimary};
  }
`;
export const ArrowPagination = styled.button`
  border: 0;
  outline: none;
  cursor: pointer;
  font-weight: bold;
  text-wrap: nowrap;
  position: relative;
  background-color: transparent;
  margin-left: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  &.button {
    border-left: 1px solid lightgray;
    border-radius: 0;
    padding: 0px 10px;
    background-color: #ffffff00;
  }
  svg {
    margin-left: 5px;
  }
  &:hover {
    color: ${(props) => props.theme.bgPrimary};
  }
`;
export const ButtonPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 2em 0.5em;
  justify-content: space-between;
  margin-bottom: 0em;
  z-index: 100;
  height: 50px;
  svg {
    background-color: transparent;
  }
  && {
    .subList & {
      top: -35px;
    }
  }
  @media (max-width: 768px) {
    padding: 1em 1em 0.5em;
  }
`;
export const AddButton = styled.button`
  padding: 12px;
  border-radius: 12px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background: ${(props) => props.theme.background};
  outline: 0px;
  border: 0px solid rgb(221, 221, 221);
  margin: 0px;
  cursor: pointer;
  padding: 12px;
  margin-right: 0em;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &.skip {
    border: 0px solid #8b8989;
    padding: 5px 20px;
    height: 35px;
    justify-content: center;
    align-items: center;
    display: flex;
    background-color:${(props) => props.theme.pageBackground};
  }
  &.skip svg {
    margin: 0px;
    margin-left: 5px;
  }
  &.add {
  }
  && {
    /* .popup-child & {
      color: ${(props) => props.theme.secForeground};
      background: ${(props) => props.theme.secBackground};
    } */
  }
  &:hover {
    color: ${(props) => props.theme.themeForeground};
    background-color: ${(props) => props.theme.theme};
  }
  & > svg {
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    margin-right: 0px;
    justify-content: center;
    align-items: center;
    span {
      display: none;
    }
    & > svg {
      margin-right: 0px;
    }
  }
`;
export const FilterBox = styled.div`
  flex-direction: row;
  display: flex;

  &.menu {
    width: 100%;
    margin-bottom: 5px;
    position: sticky;
    top: 0;
    padding-bottom: 5px;
    background: white;
    flex-wrap: wrap;
    column-gap: 5px;
    margin: -10px;
    padding: 10px;
    padding-bottom: 0;
    margin-bottom: 15px;
  }
  &.gap {
    gap: 10px;
  }
  .filter {
    margin-right: 0;
  }
`;
export const Filter = styled.button`
  background: transparent;
  padding: 0 0.5em;
  font-size: initial;
  margin-right: 0.5em;
  outline: none;
  border: 0px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
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
  transition: 0.2s ease-in-out;
  &.single {
    padding: 0 0.5em;
    margin-top: 0;
    height: auto;
  }
  &.inner-long {
    width: auto;
    text-wrap: nowrap;
    margin-left: 0;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    gap: 10px;
    height: auto;
    margin: 0;
    width: auto;
    padding: 7px 15px;
    font-size: 12px;
    margin-right: 0;
    margin-left: auto;
  }
  &:hover {
    color: ${(props) => props.theme.theme};
    svg{
      transition: 0.2s ease-in-out;
      transform:scale(1.1)
    }
  }
  &.open {
    color: green;
  }
  && {
    /* .popup-child & {
      color: ${(props) => props.theme.secForeground};
      background: ${(props) => props.theme.secBackground};
    } */
  }
`;
export const Filters = styled.div`
  display: flex;
  margin: 0;
  flex-flow: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 10px;
  display: none;
  &.center {
    margin-left: auto;
  }
  && {
    .show-filter & {
      margin: 7px 0px 0px 30px;
      display: table;
      border-right: 0px solid lightgrey;
      padding: 0px 10px 0 0;
      border-radius: 0;
      width: 250px;
      position: sticky;
      top: 0;
    }
  }
  @media (max-width: 768px) {
    flex-flow: wrap;
    max-width: 100%;
    margin-bottom: 10px;
    && {
      .show-filter & {
        position: absolute;
        background-color: lightgray;
        z-index: 1001;
        width: 200px;
        margin: 0px 1em;
        padding: 10px;
        border-radius: 10px;
        top: auto;
      }
    }
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
  /* border: 1px solid #ddedeb; */
  justify-content: center;
  display: flex;
  align-items: center;
  height: 100px;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  &.small {
    height: auto;
  }
  &.noshadow {
    box-shadow: none;
  }
  &.white-list {
    margin: 0em 2em 0px;
    border-radius: 10px;
  }
  @media screen and (max-width: 768px) {
    &.white-list {
      margin: 0em 1em 0px;
      border-radius: 10px;
    }
  }
  &.white {
    border-radius: 10px;
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: inherit;
    gap: 10px;
  }
  svg {
    margin: auto;
    font-size: 30px;
  }
  button {
    padding: 10px;
    font-size: 12px;
  }
  button svg {
    font-size: 15px;
  }
`;
export const Img = styled.img`
  height: 50px;
  object-fit: cover;
  width: 100px;
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
  margin-top: 0px;
  margin-bottom: 0px;
  &.callBack {
    margin-right: 10px;
    width: auto;
    border-radius: 10px;
    padding: 0 10px;
    /* border: 1px solid rgb(221, 221, 221); */
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
    font-size: 12px;
    svg {
      margin-right: 5px;
    }
  }
  @media screen and (max-width: 768px) {
    /* span {
      display: none;
    } */
  }
  &.active,
  &:hover {
    color: white;
    background-color: ${(props) => props.theme.theme};
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
export const TableContaner = styled.div`
  margin: 3px 2em 0px;
  padding: 0em 1em 0em;
  background-color: white;
  border-radius: 10px;
  height: calc(100vh - 192px);
  overflow: auto;
  width: -webkit-fill-available;
  background: white;
  /* border: 1px solid rgb(221, 221, 221); */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  && {
    .show-filter & {
      margin: 0em 2em 0 10px;
    }
  }
  @media screen and (max-width: 768px) {
    margin: 0em 1em 0px;
    height: calc(100vh - 180px);
  }
`;

export const TableView = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  margin-bottom: auto;
  thead > tr {
    /* background-color: white; */
  }
  th {
    background-color: ${(props) => props.theme.pageBackground};
  }
  tr:hover {
    background-color: ${(props) => props.theme.themeLight};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
    border-radius:12px;
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
export const ThView = styled.th`
  text-align: left;
  padding: 20px 8px 15px;
  position: sticky;
  top: 0;
  z-index: 30;
  background: white;
  font-weight: bolder;
  border-radius: 0px;
  color: #626262;
  :first-child {
    border-top-left-radius: 12px;
  }
  :last-child {
    border-top-right-radius: 12px;
    border-right: 0px solid rgb(238 238 238);
  }
  && {
    .plain & {
      background-color: transparent;
    }
  }
  &.true {
    position: sticky;
    left: 0px;
  }

  &.actions {
    display: flex;
    justify-content: right;
    padding-right: 20px;
  }
`;

export const TrView = styled.tr`
  border-top: 1px solid rgb(241 241 241);
cursor: pointer;
  /* &:hover {
    background-color: #eaeaea;
    border-radius: 12px;
  } */
  &:last-child td:first-child {
    border-bottom-left-radius: 12px;
  }
  &:last-child td:last-child {
    border-bottom-right-radius: 12px;
  }
  &:last-child {
    border-bottom: 0;
  }
`;
export const CoutSelector = styled.td`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10001;
  background: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px;
`;
export const TdView = styled.td`
  text-align: left;
  /* background-color: white; */
  /* border-right: 1px solid rgb(238 238 238); */
  padding: 8px;
  height: 30px;
  position: relative;
  &.true {
    position: sticky;
    left: 0px;
    /* background: white; */
  }
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
    position: sticky;
    right: -14px;
  }
  &.right {
    text-align: right;
  }
`;
export const TrBodyView = styled.tbody``;
export const ListContainer = styled.div`
  display: flex;
  display: flex;
  max-height: calc(100vh);
  overflow: auto;
`;
export const ListContainerData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 100%;
`;

export const PageNumber = styled.button`
  padding: 10px 5px;
  background-color: white;
  font-weight: bold;
  border: none;
  font-size: 14px;
  margin-bottom: 0px;
  cursor: pointer;
  border-radius: 10px;
  min-width: 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  &.true {
    background-color: ${(props) => props.theme.theme};
    color: ${(props) => props.theme.themeForeground};
    font-weight: normal;
  }
`;
export const ListContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ScrollContainerLayout = styled.div`
  padding: 1em;
  margin: 0em 2em 0px;
  width: calc(100% - 2em);
  background-color: white;
  border-radius: 10px;
  padding-bottom: 0em;
`;
export const ScrollLayout = styled.div`
  display: flex;
  flex: 1 1 100%;
  max-width: 100%;
  width: calc(100% - 0em);
  padding-bottom: 1em;
  flex-direction: column;
  min-height: calc(100vh - 14em);
  max-height: calc(100vh - 14em);
  .sub-page & {
    position: inherit;
    height: auto;
    flex-direction: column;
    min-height: 250px;
    max-height: calc(100vh - 12em);
  }
  .popup-child & {
    position: inherit;
    height: auto;
    flex-direction: column;
    min-height: 250px;
    max-height: calc(100vh - 20em);
  }
  .profile & {
    position: inherit;
    height: auto;
    flex-direction: column;
    min-height: 250px;
    max-height: calc(100vh - 20em);
  }
  && {
    .tab & {
      min-height: calc(100vh - 20em);
      max-height: calc(100vh - 20em);
    }
  }
  @media screen and (max-width: 768px) {
    min-height: calc(100% - 12em);
    max-height: calc(100% - 12em);
    min-height: inherit;
    position: fixed;
    top: 120px;
    left: 20px;
    right: 20px;
    width: auto;
    overflow: auto;
    && {
      .tab & {
        position: absolute;
        margin-top: 20px;
        height: calc(100% - 190px);
      }
      .sub-page & {
        position: inherit;
        height: auto;
        flex-direction: column;
        min-height: auto;
        max-height: calc(100vh - 12em);
        left: 0;
        top: 0;
        margin-top: 50px;
      }
    }
  }
`;
