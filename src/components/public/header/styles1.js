import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  z-index: 1;
  padding: 0em 1em;
  position: sticky;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 9px 0px;
  background-color: white;
  img {
    margin-right: auto;
    height: 30px;
    padding:10px;
  }
  @media screen and (max-width: 768px) {
    position: sticky;
  }
`;
export const Copy = styled.div`
  display: flex;
  margin-right: auto;
  @media screen and (max-width: 768px) {
    margin-right: inherit;
  }
`;
export const Right = styled.div`
  flex-direction: revert;
  display: flex;
  justify-content: center;
  align-items: center;
`;
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
  flex: auto;
  margin-right: 20px;
  a {
    color: black;
    margin-right: 10px;
    text-decoration: none;
  }
  a:last-child {
    margin-right: 0px;
  }
  @media screen and (max-width: 768px) {
    a {
      color: black;
    }
    &.hm {
      display: none;
    }
    margin-left: inherit;
  }
`;
