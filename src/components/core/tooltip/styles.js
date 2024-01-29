import styled from "styled-components";

export const LanguageIcon = styled.div`
  border: 1px solid;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  cursor: pointer;
  text-transform: uppercase;
`;
export const Languages = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: column;
  div {
    margin: 0px 0px 5px 0;
    margin-right: 10px;
    text-decoration: none;
    cursor: pointer;
    opacity: 0.5;
  }

  div:last-child {
    margin-right: 0px;
  }
  div.active {
    margin-right: 10px;
    text-decoration: none;
    cursor: pointer;
    opacity: 1;
  }
  @media screen and (max-width: 768px) {
    div {
      color: black;
    }
    div.active {
      color: #198ad6;
    }
  }
`;
