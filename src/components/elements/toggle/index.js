import React from "react";
import styled from "styled-components";

const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  span {
    box-shadow: 0 0 1px #2196f3;
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e7f2f9;
  transition: 0.4s;
  box-shadow: 0 0 1px #2196f3;
  border-radius: 34px;
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    background-color: red;
  }

  ${ToggleInput}:checked + &::before {
    transform: translateX(26px);
    background-color: green;
  }
`;

const OnOffToggle = ({ on, handleToggle }) => {
  return (
    <ToggleContainer>
      <ToggleInput
        type="checkbox"
        checked={on}
        onChange={() => {
          handleToggle();
        }}
      />
      <ToggleSlider />
    </ToggleContainer>
  );
};

export default OnOffToggle;
