import { DateRangePicker } from "react-date-range";
import styled from "styled-components";
export const DateBox = styled.div`
  display: "flex";
  position: relative;
`;
export const DateRange = styled(DateRangePicker)`
  position: absolute;
  z-index: 1;
  display: none !important;
  top: 50px;
  border-radius: 10px;
  &.true {
    display: flex !important;
  }
`;
export const Filter = styled.button`
  background: transparent;
  padding: 0 0.5em;
  font-size: 1em;
  margin-right: 0.5em;
  outline: none;
  border: 0px solid #ddd;
  border: 0px solid #ddd;
  cursor: pointer;
  height: 40px;
  margin-right: 10px;
  padding: 12px;
  background: ${(props) => props.theme.background};
  border-radius: 12px;
  margin-top: 4px;
  cursor: pointer;
  font-weight: 700;
  font-size: 13.5px;
  &:hover {
    color: ${(props) => props.theme.bgPrimary};
  }
`;
