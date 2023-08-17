import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 0em 1em;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #141414;
  color: white;
  @media screen and (max-width: 768px) {
    position: fixed;
    padding: 0em 0.7em;
    height: 40px;
    bottom: 0;
    margin: initial;
  }
`;
export const Copy = styled.div`
  display: flex;
  margin-right: auto;
  @media screen and (max-width: 768px) {
    margin-right: inherit;
  }
`;
export const Languages = styled.div`
  display: flex;
  div {
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
export const Nav = styled.nav`
  display: flex;
  margin-left: auto;
  a {
    color: white;
    margin-right: 10px;
    text-decoration: none;
  }
  a:last-child {
    margin-right: 0px;
  }
  @media screen and (max-width: 768px) {
    margin-left: inherit;
  }
`;
