import React from "react";
import styled from "styled-components";
import { GetIcon } from "../../../icons";

const CheckboxWrapper = styled.label`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
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
  border: ${(props) => (props.checked ? "2px solid " + props.theme.secBackground : "2px solid " + props.theme.secBackground)};
  margin-right: 8px;
  vertical-align: middle;
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props) => (props.checked ? props.theme.secBackground : "transparent")};
  color: ${(props) => (props.checked ? props.theme.secBackground : "transparent")};
`;
const CheckboxLabel = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const Checkbox = ({ label, checked, onChange, theme }) => {
  return (
    <CheckboxWrapper>
      <CheckboxInput type="checkbox" checked={checked} onChange={onChange} />
      <CheckboxCheckmark theme={theme} checked={checked}>
        {checked && <GetIcon icon={"checked"} />}
      </CheckboxCheckmark>
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxWrapper>
  );
};

export default Checkbox;
