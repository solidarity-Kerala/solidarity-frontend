import styled, { css } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex: calc(50% - 10px);
  animation: ${(props) => props.animation};
  flex-direction: column;
  &.checkbox {
    flex: none;
    height: 40px;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  &.disabled {
    display: none;
  }
  &.textarea {
    flex: calc(100% - 10px);
  }
  &.direct input {
    /* background-color:transparent; */
    margin-bottom: 0;
    border-radius: 0;
  }
  &.small {
    width: 25%;
    flex: 1 1 calc(25% - 10px);
  }
  && {
    /* Styles to apply when parent has class shrink */
    .popup & {
      &:nth-of-type(even) {
        margin-left: 5px;
      }
      &:nth-of-type(odd) {
        margin-right: 5px;
      }
      &.textarea {
        flex: calc(100% - 0px);
        margin-right: 0px;
      }
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (max-width: 768px) {
    flex: 100%;
    margin: 0px !important;
    &.checkbox {
      flex: 1 1 100%;
      margin: 0px 5px 15px !important;
    }
  }
  ${(props) =>
    props.children &&
    css`
      & input:focus ~ .floating-label,
      textarea:focus ~ .floating-label,
      textarea:not(:focus):valid ~ .floating-label,
      input:not(:focus):valid ~ .floating-label,
      input[type="date"]:not(:focus):invalid ~ .floating-label,
      .filter input[type="date"]:not(:focus):invalid ~ .floating-label,
      input[type="datetime-local"]:not(:focus):invalid ~ .floating-label,
      .filter input[type="datetime-local"]:not(:focus):invalid ~ .floating-label {
        top: -1px;
        left: 13px;
        right: 6px;
        font-size: 11px;
        opacity: 1;
        text-align: left;
        height: 19px;
        padding: 3px 0;
      }
    `}
`;
export const FileContainer = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px;
  outline: none !important;
  width: 100%;
  border-radius: 10px;
  border: 0px solid Black;
  margin: 0 0px 0px 0;
  font-weight: 700;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  -webkit-transition: all 0.2s ease-out 0s;
  transition: all 0.2s ease-out 0s;
  color: ${(props) => props.theme.secForeground};
  background: ${(props) => props.theme.secBackground};
  text-align: center;
  &.disabled {
    display: none;
  }
  button {
    background-color: transparent;
    border: 0;
    display: flex;
    flex-direction: column;
    margin: auto;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
      font-size: 20px;
      margin-bottom: 5px;
    }
  }
`;
export const Label = styled.label`
  position: absolute;
  pointer-events: none;
  top: 5px;
  left: 13px;
  font-size: 10px;
  transition: all 0.1s ease;
  color: ${(props) => props.theme.lightForeground};
  &.shrink {
    display: none;
  }
  &.error {
    color: red;
    color: red;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 93%;
  }
  &.checkbox {
    position: initial;
    pointer-events: initial;
    display: flex;
    align-items: center;
  }
  svg {
    margin-right: 5px;
    color: green;
  }
  && {
    /* Styles to apply when parent has class shrink */
    .filter & {
      top: 10px;
      font-size: 10px;
    }
  }
`;

export const CheckBox = styled.input`
  margin: 0;
  margin-right: 5px;
  & ~ .checkmark {
    background-color: #ccc;
  }

  &:checked ~ .checkmark {
    background-color: #2196f3;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  &:checked ~ .checkmark:after {
    display: block;
  }

  .container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
export const Input = styled.input`
  box-sizing: border-box;
  padding: 13px 10px;
  outline: none !important;
  width: 100%;
  border-radius: 10px;
  border: 0px solid ${(props) => props.theme.border};
  height: 40px;
  margin: 0 0px 0px 0;
  padding-left: 1em;
  font-weight: 700;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  transition: all 0.2s ease-out 0s;
  color: ${(props) => props.theme.secForeground};
  background: ${(props) => props.theme.secBackground};
  &.shrink {
    padding: 1.2em 13px 0;
  }
  -webkit-appearance: none;
`;
export const DatetimeInput = styled(DatePicker)`
  box-sizing: border-box;
  outline: none !important;
  width: 100%;
  border-radius: 10px;
  border: 0px solid ${(props) => props.theme.border};
  margin: 0 0px 0px 0;
  height: 40px;
  padding-left: 1em;
  font-weight: 700;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  transition: all 0.2s ease-out 0s;
  color: ${(props) => props.theme.secForeground};
  background: ${(props) => props.theme.secBackground};
  &.shrink {
    padding: 1.2em 13px 0px;
    color: black;
  }
  && {
    /* Styles to apply when parent has class shrink */
    .filter & {
      padding: 1.4em 13px 0px;
      margin: 4px 0px 0px 0;
      background-color: white;
      height: 40px;
    }
  }
`;
export const DatetimeInputDirectOrder = styled(DatePicker)`
  box-sizing: border-box;
  outline: none !important;
  width: fit-content;
  border-radius: 10px;
  border: 0px solid ${(props) => props.theme.border};
  margin: 0 0px 10px 0;
  height: 40px;
  padding-left: 1em;
  font-weight: 700;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  transition: all 0.2s ease-out 0s;
  color: ${(props) => props.theme.secForeground};
  background: ${(props) => props.theme.secBackground};
  &.shrink {
    padding: 1.6em 13px 0;
    color: black;
  }
`;
export const Button = styled.button`
  height: 40px;
  border-radius: 10px;
  background: ${(props) => props.theme.theme};
  color: ${(props) => props.theme.foregroundInvert};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  transition: all 0.5s ease;
  margin-top: 10px;
  max-width: 400px;
  padding: 10px 15px;
  width: auto;
  border-color: ${(props) => props.theme.border};
  cursor: pointer;
  border-width: 0;
  justify-content: center;
  min-width: 130px;
  &.close {
    background: transparent;
    color: black;
    margin-right: 1em;
    min-width: 120px;
  }
  &.custom {
    margin: 0;
    gap: 5px;
    display: flex;
    align-items: center;
    text-wrap: nowrap;
    width: fit-content;
  }
  &.left {
    margin: 0;
    margin-right: auto;
  }
  &.right {
    margin: 0;
    margin-left: auto;
  }
  &.center {
    margin: 0;
    margin-left: auto;
    margin-right: auto;
  }
  &.secondary {
    background: white;
    color: black;
  }
  &:disabled {
    background-color: ${(props) => props.theme.disabledBackground};
    color: ${(props) => props.theme.disabledForeground};
    cursor: not-allowed;
  }
`;
export const TextArea = styled.textarea`
  box-sizing: border-box;
  font-family: inherit;
  outline: none !important;
  width: 100%;
  border-radius: 10px;
  border: 0px solid ${(props) => props.theme.border};
  height: 70px;
  margin: 0 0px 0px 0;
  padding-left: 1em;
  font-weight: 700;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  transition: all 0.2s ease-out 0s;
  padding: 13px 10px;
  color: ${(props) => props.theme.secForeground};
  background: ${(props) => props.theme.secBackground};
  &.shrink {
    padding: 1.5em 13px 0px;
  }
`;
export const Info = styled.div`
  padding-left: 0px;
  font-size: 14px;
  width: 100%;
  margin: 5px;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 5px;
  &.disabled {
    display: none;
  }
  &.title {
    font-size: 16px;
    padding: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #d9d9d9;
  }
`;
export const SubHead = styled.div`
  padding-left: 0px;
  width: 100%;
  border-bottom: 1px solid rgb(235, 244, 235);
  margin: 0px 10px;
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
  &.custom{
     margin: 0px 0px;
  }
`;
