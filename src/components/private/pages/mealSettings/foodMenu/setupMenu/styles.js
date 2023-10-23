import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 0;
  background: #eaeaea;
  z-index: 1;
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  background-color: white;
  font-weight: bold;
  &.true {
    background-color: #ccc;
    font-weight: normal;
  }
  border: none;
  font-size: 14px;
  margin-bottom: 10px;
  &.nomargin {
    margin: 0;
  }
  cursor: pointer;
  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
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
  &.true {
    background-color: #ccc;
    font-weight: normal;
  }
`;
export const Table = styled.table`
  width: calc(100% - 40px);
  margin-left: 30px;
  margin-right: 10px;
  border-collapse: collapse;
  tr.head th {
    border-radius: 0;
    background-color: rgb(234 234 234);
  }
  thead {
    position: sticky;
    top: 0px;
    z-index: 1;
    background-color: rgb(234 234 234);
  }
  &.full {
    margin: 10px 10px;
    width: calc(100% - 20px);
  }
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: center;
  border-radius: ${({ active }) => (active ? "0px" : "0")} !important;
  margin-bottom: 5px;
  background-color: ${({ active }) => (active ? "#f9f9f9" : "rgb(234, 234, 234)")} !important;
  border-left: 1px solid rgb(204, 204, 204);
  border-bottom: 1px solid rgb(204, 204, 204);
  border-top: 1px solid rgb(204, 204, 204);
  &:first-child {
    border-left: 0;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr``;

export const DayHead = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  .calories {
    font-size: 12px;
    background-color: white;
    padding: 5px;
    border-radius: 10px;
    width: auto;
    align-self: center;
  }
  .day {
    font-size: 15px;
  }
`;
export const ShowCalorie = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  .calories {
    font-size: 12px;
    background-color: #4b4b4b;
    color: white;
    padding: 5px;
    border-radius: 10px;
    width: auto;
    align-self: center;
    margin: 5px;
  }
  .day {
    font-size: 15px;
  }
`;
export const MealCategoryCell = styled.th`
  /* position: sticky; */
  left: 0;
  top: 0;
  text-align: left;
  width: 0;
  border-top: 1px solid #d6d6d6;
  &:first-child {
    width: 10%;
    padding: 0px 10px 0 30px;
  }
  &.nb {
    border: 0;
  }
  div {
    font-size: 12px;
  }
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 5px;
  flex-direction: column;
  /* border-top: 1px solid rgb(204, 204, 204); */
  &:first-child {
    border-top: 0px solid rgb(204, 204, 204);
  }
  &.hover {
    border-radius: 10px;
  }
`;

export const TableCell = styled.td`
  padding: 5px;
  text-align: center;
  width: 12%;
  /* height: 50px; */
  border-left: 1px solid #ccc;
  &:first-child {
    border: 0;
  }
  .layer {
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 0;
    height: -webkit-fill-available;
  }
  && {
    .short & {
      height: auto;
      border-bottom: 1px solid #ccc;
    }
  }
`;

export const FoodButton = styled.button`
  padding: 5px 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
    transform: scale(1.2);
  }
`;

export const TabData = styled.div`
  padding: 5px 10px;
  border: 1px solid #d2d2d2;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
export const TabDataItem = styled.div`
  width: 100%;
`;
export const MealItem = styled.div`
  background: white;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  flex-direction: row;
  display: flex;
`;
export const Title = styled.div`
  width: 100%;
  span {
    font-size: 10px;
  }
  .price {
    font-size: 10px;
    text-decoration: line-through;
  }
  .offer {
    font-size: 14px;
    font-weight: bolder;
  }
  .calories {
    border-left: 1px solid;
    padding-left: 5px;
    font-size: 14px;
    margin-left: 5px;
  }
`;
export const Variants = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-wrap: anywhere;
  margin-top: 10px;
  column-gap: 10px;
  &.add-button {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed gray;
    margin: 10px;
    border-radius: 5px;
  }
  &.vertical {
    flex-direction: column;
    row-gap: 5px;
    margin-top: 0px;
    overflow-wrap: initial;
    && {
      .true & > {
        flex-direction: row;
        justify-content: left;
      }
    }
  }
  &.day {
    flex-direction: row;
  }
`;
export const Details = styled.div`
  width: calc(100% - 60px);
  text-align: left;
  span {
    width: 100%;
    display: flex;
  }
  span:first-child {
    font-size: 12px !important;
    font-weight: bold;
  }
  .variant {
    font-size: 11px !important;
    font-weight: normal;
    padding-top: 2px;
  }
`;
export const Variant = styled.div`
  width: 100%;
  border: 1px solid;
  border-radius: 5px;
  padding: 5px 5px;
  font-weight: bolder;
  font-size: 14px;
  width: auto;
  flex-direction: column;
  display: flex;
  border: 1px solid #ccc;
  position: relative;
  span {
    font-size: 10px;
    text-align: left;
    font-weight: normal;
  }
  .price {
    font-size: 10px;
    text-decoration: line-through;
  }
  .offer {
    font-size: 14px;
  }
  .variant {
    font-size: 9px;
    text-align: left;
  }
  .recipe {
    font-size: 10px;
    font-weight: bolder;
    text-align: left;
    margin-top: 5px;
  }
  &.vertical .offer {
    justify-content: left;
    text-align: left;
    display: flex;
  }
  .horizontal {
    flex-direction: row;
  }
  .actions,
  .sub-actions {
    display: none;
    font-size: 12px;
    position: absolute;
    padding: 2px;
    right: 0px;
    top: 0px;
    left: 0px;
    bottom: 0px;
    cursor: pointer;
    background-color: white;
    justify-content: center;
    align-items: center;
    background-color: rgb(204 204 204 / 32%);
    column-gap: 5px;
    > span {
      box-shadow: rgb(110 113 105 / 25%) 0px 0px 12px 9px;
      border: 1px solid gray;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      justify-content: center;
      display: flex;
      align-items: center;
      background-color: white;
      border: 0;
    }
    .delete {
      right: 15px;
      top: 15px;
      background-color: red;
      color: white;
    }
  }
  &.recipe:hover .actions,
  &.recipe:hover ~ .sub-actions,
  &.child-recipe:hover > .sub-actions {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .info1 {
    font-size: 12px;
    position: absolute;
    padding: 2px;
    right: 5px;
    bottom: 5px;
    cursor: pointer;
    border-radius: 50%;
    background-color: white;
    height: 15px;
    width: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .replace {
    top: auto;
    bottom: 5px;
    right: 5px;
    left: 5px;
    border: 1px solid;
    border-radius: 10px;
    padding: 2px;
    margin-top: 5px;
    cursor: pointer;
    max-width: 50px;
    margin: 5px auto;
  }
  &.Fixed {
    border: 0;
    padding: 0;
  }
  &.selected {
    background-color: black;
    color: white;
  }

  &.add-button {
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed gray;
    border-radius: 5px;
  }
  && {
    .false & {
      &.replace {
        flex-direction: row;
      }
    }
  }
`;

export const ReplacableItems = styled.div`
  &.false {
    position: fixed;
    top: 0;
    left: 10%;
    width: 200px;
    top: auto;
    min-height: 200px;
    right: auto;
    bottom: 0;
    background-color: white;
    z-index: 1;
    padding: 10px;
    border-radius: 10px 10px 0px 0px;
    box-shadow: 0px 0px 3px 1px rgb(181 181 181 / 45%);
  }
  &.true {
  }
`;
export const SideHead = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid lightgray;
`;
export const WeekSelection = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  padding: 0px 0px;
  border: none;
  border-radius: 4px;
  align-items: center;
  font-size: 14px;
  > button {
    border: 0;
    outline: none;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    min-height: 40px;
    height: 40px;
    border-radius: 10px;
    margin: 4px 0px;
    background: white;
    transition: all 1s ease 0s;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    cursor: pointer;
    font-weight: bold;
    text-wrap: nowrap;
    padding: 0 15px;
    position: relative;
    span {
      display: none;
      transition: all 1s ease 0s;
      position: absolute;
      background: white;
      padding: 10px;
      border-radius: 10px;
      top: 45px;
      z-index: 100;
    }
  }
  > button.active {
    background-color: #cccccc;
    svg {
      transform: scale(1.2);
    }
  }
  > button:hover span {
    display: flex;
    width: auto;
  }
  > span {
    font-weight: bold;
    width: 70px;
    text-align: center;
  }
`;
export const ActionBox = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  padding: 0px 0px;
  border: none;
  border-radius: 4px;
  align-items: center;
  font-size: 14px;
  padding-bottom: 10px;
  position: sticky;
  top: 0;
  background: #eaeaea;
`;
export const SwitchButton = styled.div`
  border: 0;
  outline: none;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  min-height: 40px;
  height: 40px;
  width: 20px;
  border-radius: 10px;
  margin: 4px 0px;
  transition: all 1s ease 0s;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  cursor: pointer;
  font-weight: bold;
  text-wrap: nowrap;
  padding: 0 15px;
  position: relative;
  &.custom {
    margin: auto;
    margin-right: 10px;
  }
  span {
    display: none;
    transition: all 1s ease 0s;
    position: absolute;
    background: white;
    color: black;
    padding: 10px;
    border-radius: 10px;
    top: 45px;
    z-index: 100;
    font-size: 12px;
  }
  background-color: ${({ active, enableBg }) => (active ? enableBg ?? "green" : "white")};
  color: ${({ active, enableColor }) => (active ? enableColor ?? "white" : "grey")};
  svg {
    font-size: 20px;
    /* transform: ${({ active }) => (active ? "scale(1.2)" : "scale(1)")}; */
  }

  &:hover span {
    display: flex;
    width: auto;
  }
`;
