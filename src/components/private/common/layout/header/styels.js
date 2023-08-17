import styled from "styled-components";

export const Container = styled.div`
  padding: 00em 0em;
  display: flex;
  height: 60px;
`;
export const Logo = styled.img`
  height: 65px;
  width: fit-content;
  padding-left: 1em;
  padding-top: 1em;
  margin-bottom: 10px;
`;
export const LogoContaner = styled.div`
  display: flex;
  flex: 1 1 15em;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 10px;
  @media screen and (max-width: 768px) {
    justify-content: right;
    padding-right: 15px;
    justify-content: space-between;
  }
`;
export const Status = styled.div`
  flex: 1 1 calc(100% - 15em);
  display: flex;
  justify-content: left;
  align-items: center;
  padding-right: 10px;
  @media screen and (max-width: 768px) {
    &.hm {
      display: none;
    }
  }
`;
export const MNav = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0px 15px 15px;

  @media screen and (max-width: 768px) {
    display: flex;
    padding-left: 15px;
    font-size: 25px;
  }
`;
export const Title = styled.div`
  margin-right: auto;
  svg {
    margin-right: 10px;
  }
`;
export const User = styled.div`
  margin-right: 1em;
`;
export const Logout = styled.div`
  margin-right: 1em;
  color: red;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    color: red;
  }
  svg {
    margin-right: 10px;
  }
  @media screen and (max-width: 768px) {
    margin-left: auto;
    border: 1px solid;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 25px;
    cursor: pointer;
    text-transform: uppercase;
    svg {
      margin: auto;
    }
  }
`;

export const MNavClose = styled.div`
  margin-right: 1em;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display:none;
  a {
    text-decoration: none;
  }
  svg {
    margin-right: 10px;
  }
  @media screen and (max-width: 768px) {
    margin-left: auto;
    display: flex;
    border: 1px solid;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 25px;
    cursor: pointer;
    text-transform: uppercase;
    svg {
      margin: auto;
    }
  }
`;
