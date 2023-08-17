import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
`;
export const ListItemHead = styled.div`
  font-weight: bold;
  display: flex;
  margin: 0;
  color: #1381c5;
  padding: 0.5em 1em;
  margin-bottom: 3.5em;
  border-bottom: 1px solid white;
  text-transform: uppercase;
  &:first-child {
    margin-top: 0;
  }
`;
export const ListItem = styled.div`
  display: flex;
  padding: 0.5em 1em;
  &.between {
    justify-content: space-between;
  }
  svg {
    margin-top: 3px;
    margin-right: 10px;
  }
  &.red {
    color: red;
  }
`;
export const ListItemBold = styled.div`
  display: flex;
  font-weight: 600;
  padding: 0.5em 1em;
  svg {
    margin-right: 10px;
  }
`;

export const ListItemQuarter = styled.div`
  display: flex;
  flex: 1 1 25%;
  span {
    margin-left: 10px;
    cursor: pointer;
  }
  &.paid {
    color: green;
  }
  &.canceled {
    color: red;
  }
  &.open {
    color: yellow;
  }
  @media screen and (max-width: 768px) {
    &.hm {
      display: none;
    }
  }
`;
export const ToolTipContainer = styled.span`
  position: relative;
`;

export const ToolTip = styled.div`
  position: absolute;
  top: 0;
  left: 19px;
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  margin-bottom: 10px;
  cursor: initial;
  &.language {
    top: 27px;
    left: -80px;
    font-size: 18px;

    @media screen and (max-width: 768px) {
      font-size: 15px;
    }
  }
  &.actions {
    top: 50px;
    left: auto;
    right: 0;
    z-index: 1000;
    border-radius:12px;
    font-size: 18px;
    padding: 0px;
    @media screen and (max-width: 768px) {
      font-size: 15px;
    }
  }
  &.hide {
    display: none;
  }
`;