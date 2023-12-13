import React from "react";
import styled from "styled-components";
import { getValue } from "../functions";
const getColor = (color) => color || "gray";
const Title = styled.span`
  border: 1px solid ${(props) => getColor(props.color)};
  color: ${(props) => getColor(props.color)};
  border-radius: 5px;
  padding: 0px 5px;
  margin-left: 5px;
  font-weight: 400;
  padding: 5px;
  font-size: 12px !important;
  margin-top: -3px;
`;
const Highlight = ({ highlight, data }) => {
  const getColor = () => {
    if (highlight.colorCollection?.length > 1) {
      return data[highlight.colorCollection]?.[highlight.colorName];
    } else {
      return data[highlight.colorName];
    }
  };

  const getTitleValue = () => {
    const value = highlight.collection?.length > 1 ? data[highlight.collection]?.[highlight.name] : data[highlight.name];

    return value ? getValue(highlight, value) : null;
  };

  return highlight ? getTitleValue() ? <Title color={getColor({ highlight, data })}>{getTitleValue()}</Title> : null : null;
};

export default Highlight;
