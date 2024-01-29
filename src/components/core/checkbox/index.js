import React from "react";
import styled from "styled-components";
import { GetIcon } from "../../../icons";

const CheckboxWrapper = styled.label`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const CheckboxCheckmark = styled.span`
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
  border: ${(props) => (props.checked ? "2px solid " + props.theme.theme : "2px solid " + props.theme.secBackground)};
  margin-right: 8px;
  vertical-align: middle;
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props) => (props.checked ? props.theme.theme : "transparent")};
  svg {
    color: ${(props) => (props.checked ? props.theme.themeForeground : "transparent")} !important;
  }
  &.round {
    border-radius: 50%;
  }
`;
const CheckboxLabel = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const Checkbox = ({ label, checked, onChange, theme, className = "" }) => {
  return (
    <CheckboxWrapper>
      <CheckboxInput type="checkbox" checked={checked} onChange={onChange} />
      <CheckboxCheckmark className={className} theme={theme} checked={checked}>
        {checked && <GetIcon icon={"checked"} />}
      </CheckboxCheckmark>
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxWrapper>
  );
};

export default Checkbox;
