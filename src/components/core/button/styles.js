import styled from "styled-components";

export const ButtonStyle = styled.button`
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.5em 1em;
  min-width: 100px;
  margin-top: 10px;
  cursor: pointer;
`;
