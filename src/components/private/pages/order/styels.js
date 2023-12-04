import styled from "styled-components";
export const Head = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 9px 1px;
  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    /* border-left: 1px solid #747474; */
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
    border: 1px solid lightgray;
    padding: 2px 5px;
    font-style: normal;
    border-radius: 5px;
    margin-left: 5px;
    font-size: 12px;
  }
  span{
    justify-content: center;
    align-items: center;
    display: flex;
    svg{
      margin-right:10px;
    }
  }
`;

export const Items = styled.div`
  /* border: 1px solid rgb(227 227 227); */
  width: 100%;
  padding: 0px;
  border-radius: 0;
  height: calc(100vh - 160px);
  overflow: hidden;

  &.sticky {
    position: sticky;
    top: 0;
  }
`;
export const Patient = styled.div`
  padding: 10px;
  border: 1px solid rgb(227 227 227);
  border-radius: 10px;
  font-size: 12px;
  width: 100%;
  position: relative;
  display: flex;
  .bold {
    color: black;
  }
  .light {
    gap: 5px;
    display: flex;
    flex-direction: column;
  }
  .small {
    color: grey;
    font-size: 12px;
  }
`;
export const DataBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  max-height: calc(100% - 47px);
  > div:last-child .order {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .selected > div {
    box-shadow: inset rgb(146 146 146 / 14%) 0px 1px 15px 5px;
  }
`;
export const SubHead = styled.div`
  font-weight: 600;
  font-size: 13px;
`;
