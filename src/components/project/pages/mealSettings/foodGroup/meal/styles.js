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
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: center;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr``;

export const MealCategoryCell = styled.th`
  position: sticky;
  left: 0;
  top: 0;
  padding: 0px 10px 0 30px;
  text-align: left;
`;

export const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  &.hover {
    border: 1px dashed;
    border-radius: 10px;
    padding: 10px;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: white;
  text-align: center;
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
  &:hover .delete {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
