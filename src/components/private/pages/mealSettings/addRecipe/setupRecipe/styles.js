import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? "#f9f9f9" : "#ccc")};
  border: none;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    position: sticky;
    top: -33px;
    z-index: 1;
  }
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: center;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr``;

export const MealCategoryCell = styled.th`
  /* position: sticky; */
  left: 0;
  top: 0;

  text-align: left;
  width: 0;
  &:first-child {
    width: 10%;
    padding: 0px 10px 0 30px;
  }
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  border-top: 1px solid rgb(204, 204, 204);
  padding: 5px;
  font-size: 12px;
  &.variants {
    min-height: 40px;
    padding: 2px 10px;
    font-size: 15px;
    font-weight: 500;
    text-align: left;
    margin: -5px;
  }
  &.left {
    text-align: left;
    align-items: self-start;
  }
  &.nowrap {
    white-space: nowrap;
  }
  &:first-child {
    border-top: 0px solid rgb(204, 204, 204);
  }
  &.hover {
    border-radius: 10px;
  }
`;

export const TableCell = styled.td`
  padding: 5px;
  border: 4px solid rgb(234 234 234);
  background-color: white;
  text-align: center;
  width: auto;
  border-radius: 15px;
  &.padding {
    padding: 10px;
  }
  &.head {
    background-color: rgb(75, 75, 75);
    color: white;
  }
  &.left {
    text-align: left;
  }
`;
export const TableHead = styled.td`
  padding: 0px;
  border: 1px solid #ccc;
  background-color: white;
  text-align: center;
  min-width: 50px;
  &.padding {
    padding: 10px;
  }
  &.left {
    text-align: left;
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
export const DataItemContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  column-gap: 5px;
  row-gap: 5px;
  margin-top: 5px;
  &.nowrap {
    white-space: nowrap;
    width: max-content;
  }
`;
export const DataItem = styled.div`
  padding: 5px;
  border-radius: 10px;
  font-size: 12px;
  line-height: 14px;
  border: 1px solid #ddd;
  font-weight: normal;
  &.span {
    display: flex;
    gap: 5px;
  }
  svg {
    margin-right: 5px;
  }
  span::after {
    content: " •";
  }
  &.head {
    background-color: rgb(75, 75, 75);
    color: white;
    font-weight: bold;
  }
  span:last-child:after {
    content: "";
  }
  p {
    text-align: center;
    white-space: pre-line;
    display: contents;
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
`;
export const Title = styled.div`
  width: 100%;
  font-weight: bold;
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
  svg {
    margin-right: 5px;
  }
`;
export const Variants = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-wrap: anywhere;
  margin-top: 10px;
  column-gap: 10px;

  &.vertical {
    flex-direction: column;
    row-gap: 5px;
    margin-top: 0px;
    overflow-wrap: initial;
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
  &.selected {
    background-color: black;
    color: white;
  }
  &:hover .delete {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ReplacableItems = styled.div`
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
`;
export const SideHead = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid lightgray;
`;
export const Button = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding-top: 10px;
  cursor: pointer;
`;
