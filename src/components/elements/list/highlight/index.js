import React from "react";
import styled from "styled-components";

const Title = styled.span`
  background-color: red;
  color: white;
  border-radius: 5px;
  padding: 0px 5px;
  margin-left: 5px;
  font-weight:400;
`;
const Highlight = ({ highlight }) => {
  return highlight ? <Title>{highlight.name}</Title> : null;
};

export default Highlight;
