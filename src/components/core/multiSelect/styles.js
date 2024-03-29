import styled from "styled-components";
export const SelectBox = styled.div`
  &.disabled {
    display: none;
  }
  position: relative;
  width: 100%;
  &.half {
    width: 40%;
  }
  &.half:nth-child(odd) {
    width: calc(50% - 5px);
    margin-left: 5px;
  }
  &.half:nth-child(even) {
    width: calc(50% - 5px);
    margin-right: 5px;
  }
  flex: calc(50% - 10px);
  @media screen and (max-width: 768px) {
    &.half:nth-child(odd) {
      width: 100%;
      margin-left: 0px;
    }
    &.half:nth-child(even) {
      width: 100%;
      margin-right: 0px;
    }
    &.filter {
      width: calc(50% - 7px);
    }
  }
  && {
    /* Styles to apply when parent has class shrink */
    .nowrap & {
      margin-right: 10px;
      margin-left: 0;
    }
  }
  button {
    outline: none !important;
    width: 100%;
    border-radius: 10px;
    border: 0px solid silver;
    height: 40px;
    padding-left: 1em;
    font-weight: 700;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
    -webkit-transition: all 0.2s ease-out 0s;
    transition: all 0.2s ease-out 0s;
    color: ${(props) => props.theme.secForeground};
    background: ${(props) => props.theme.secBackground};
    text-align: left;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0 0px 0px 0;
  }
  &.filter button {
    min-height: 40px;
    height: 40px;
    margin: 4px 0;
    min-width: 150px;
    background: white;
  }
  &.filter {
    margin-right: 0.5em;
  }
  &.auto{
    margin-right: auto;
  }
  button label {
    display: none;
  }
  button label svg {
    color: green !important;
    transform: rotate(0deg) !important;
  }
  button.has {
    padding-top: 15px;
  }
  button.has label {
    position: absolute;
    display: block;
    font-weight: normal;
    top: 5px;
    left: 13px;
    font-size: 10px;
  }
  button.has svg:first-child {
    margin-right: 5px;
  }
  &.filter button.has label {
    font-size: 10px;
    top: 10px;
  }
  &.filter .options {
    top: 50px;
  }
  &.open svg.down {
    transition: all 0.2s ease-out 0s;
    transform: rotate(180deg);
    color: black;
  }
  button svg {
    margin-left: auto;
    margin-right: 1em;
  }
  .options {
    opacity: 1;
    pointer-events: auto;
    -webkit-transform: scale(1) translateY(0);
    -ms-transform: scale(1) translateY(0);
    transform: scale(1) translateY(0);
    max-height: 250px;
    min-height: 70px;
    overflow-y: auto;
    width: 100%;
    background-color: white;
    border: 1px solid rgb(224, 224, 227);
    border-radius: 12px;
    list-style: none;
    padding: inherit;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    margin: 0;
    top: 42px;
    transition: all 1s ease-out 0s;
  }
  .options li.true {
    background: rgb(234, 234, 234);
    color: #0f0f0f;
    font-weight: bold;
    border: 1px solid rgb(224, 224, 227);
    justify-content: left;
    display: flex;
    align-items: center;
  }
  &.list .options {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .options li {
    cursor: pointer;
    border: 1px solid rgb(224, 224, 227);
    padding: 5px 10px;
    margin: 0 00px;
  }
  .options li svg {
    color: ${(props) => props.theme.lightSecForeground};
    margin-left: 10px;
    transform: rotate(0deg);
  }
  .options li:last-child {
    /* border-bottom: 0px solid rgb(224, 224, 227); */
  }
  .options li:hover {
    background: rgb(234, 234, 234);
    color: #0f0f0f;
  }
`;
export const Label = styled.label`
  position: absolute;
  pointer-events: none;
  top: 12px;
  left: 14px;
  font-size: 12px;
  transition: all 0.1s ease;
  color: ${(props) => props.theme.foreground};
  &.shrink {
    display: none;
  }
`;

export const Selected = styled.label`
  padding: 10px;
  font-weight: bold;
`;

export const ItemBox = styled.div`
  margin: 5px 5px 0;
  border-radius: 10px;
  font-size: 14px;
  width: -webkit-fill-available;
  &:nth-child(2) {
    margin-top: 0;
  }
  && {
    .list & {
      margin: 5px 5px 0px;
      border-radius: 10px;
      font-size: 14px;
      display: flex;
      flex-flow: wrap;
      gap: 0px 5px;
    }
  }
  li {
    border-radius: 10px;
    margin-bottom: 5px !important;
  }
`;
