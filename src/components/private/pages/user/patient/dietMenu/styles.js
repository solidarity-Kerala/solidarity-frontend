import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  width: 100%;
  position: sticky;
  top: -32px;
  background: rgb(234, 234, 234);
  z-index: 1;
`;

export const TabButton = styled.button`
  padding: 0px 20px;
  background-color: transparent;
  border: none;
  font-size: 14px;
  margin-bottom: 10px;
  padding: 10px 10px;
  cursor: pointer;
  border-bottom: 1px solid ${({ active }) => (active ? "#EB6B55" : "rgb(204, 204, 204)")};
  color: ${({ active }) => (active ? "#EB6B55" : "black")};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    position: sticky;
    top: 0px;
    z-index: 1;
    background-color: rgb(234 234 234);
  }
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: center;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr``;

export const DayHead = styled.div`
  margin: 0px 0px;
  font-weight: 600;
  padding-bottom: 0;
  .calories {
    font-size: 12px;
    background-color: white;
    padding: 5px;
    border-radius: 10px;
    width: auto;
    align-self: center;
  }

  white-space: nowrap;
  .day {
    font-size: 14px;
  }
  .dayName {
    font-size: 12px;
  }
`;
export const MealCategoryCell = styled.th`
  /* position: sticky; */
  left: 0;
  top: 0;
  text-align: left;
  width: 0;
  border: 1px solid #d6d6d6;
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
  padding: 0px;
  border: 1px solid #ccc;
  background-color: white;
  text-align: center;
  width: 12%;
  height: 50px;
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
      .true & {
        flex-direction: row;
        justify-content: left;
      }
    }
  }
`;
export const Details = styled.article`
  display: flex;
  margin: 0px;
  padding: 10px;
  font-size:12px;
  background: white;
  &.head {
    background: rgb(248, 248, 248);
    color: black;
    font-weight: 600;
    padding: 10px;
    border-radius: 10px;
    margin-bottom:10px;
  }
  > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  div:last-child {
    font-size:13px;
    font-weight: bold;
  }
  > div > span {
    width: 100%;
    display: flex;
  }
  > div > span::after {
    content: " \u2022"; /* Unicode character for round dot */
  }
  > div > span:last-child::after {
    content: ""; /* Empty content for the last span */
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
  }
  &.vertical .offer {
    justify-content: left;
    text-align: left;
    display: flex;
  }
  .horizontal {
    flex-direction: row;
  }
  .delete {
    display: none;
    font-size: 8px;
    position: absolute;
    padding: 2px;
    right: -5px;
    top: -5px;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid;
    background-color: white;
    height: 10px;
    width: 10px;
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
  }
  &.Fixed {
    border: 0;
    padding: 0;
  }
  &.selected {
    background-color: black;
    color: white;
  }
  &:hover .delete {
    display: flex;
    justify-content: center;
    align-items: center;
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

export const SideHead = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid lightgray;
`;
export const Box = styled.div`
  padding: 0px;
  display: ${({ active }) => (active ? "block" : "none")};
`;

export const DayData = styled.div`
  padding: 0px;
`;
export const MealTimeHead = styled.div`
  background: #f8f8f8;
  color: black;
  font-weight: 600;
  padding: 10px;
  border-radius: 10px;
`;
export const Recepes = styled.div`
  margin: 10px 0;
  .recipe {
    border-bottom: 1px solid rgb(227 227 227);
  }
  .recipe:first-child {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  .recipe:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom: 0px;
  }
`;
export const Recepe = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 10px;
  background: white;
  &.horizontal {
    border: 1px solid rgb(227 227 227);
    border-radius: 10px;
  }
`;
export const RecepeData = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
  .title {
    font-weight: bold;
  }
  .light {
    font-size: 12px;
    color: gray;
    line-height: 12px;
    margin-top: 5px;
    font-weight: bold;
  }
  .light span {
    margin-right: 3px;
  }
  .light span::after {
    content: " \u2022"; /* Unicode character for round dot */
  }
  .light span:last-child::after {
    content: ""; /* Empty content for the last span */
  }

  && {
    .horizontal & {
      .title {
        font-size: 12px;
      }
      .light {
        font-size: 11px;
      }
    }
  }
`;
export const RecepeContent = styled.div`
  display: flex;
  flex-direction: row;
`;
export const RecepeImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 10px;
  object-fit: cover;
  && {
    .horizontal & {
      width: 40px;
      height: 40px;
    }
  }
`;
export const ReplacableItems = styled.div`
  border: 1px solid rgb(227 227 227);
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  .head {
    font-size: 12px;
    border-bottom: 1px solid rgb(227 227 227);
    padding: 5px 0px;
    font-weight: 600;
    margin: 0 0px;
    margin-bottom: 10px;
  }
`;

export const ReplacableItemsList = styled.div`
  display: flex;
  flex-flow: wrap;
  display: flex;
  column-gap: 10px;
  row-gap: 10px;
`;
export const UserDetails = styled.div`
  row-gap: 10px;
  article {
    border-bottom: 1px solid rgb(227 227 227);
  }
  article:first-child {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  article:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom: 0px;
  }
`;
