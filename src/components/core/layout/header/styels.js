import styled from "styled-components";

export const Container = styled.div`
  padding: 0px 2em;
  display: flex;
  height: 60px;
  @media (max-width: 768px) {
    padding: 0px 0em;
  }
`;
export const HeaderMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d9d9d9;
  flex-direction: column;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  position: relative;
  background-color: red;
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
    margin: auto;
    object-fit: cover;
    border-radius: 50%;
  }
  > span {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h6 {
    text-align: center;
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
    font-size: 15px;
  }
  @media (max-width: 768px) {
    padding: 15px;
    width: -webkit-fill-available;
    width: 10px;
    height: 10px;
    &.vertical {
      flex-direction: column;
    }
  }
`;
export const Logo = styled.img`
  height: 65px;
    max-width: 90%;
    object-fit: contain;
    width: fit-content;
    padding-left: 0em;
    padding-top: 0em;
    margin-bottom: 0px;
  @media screen and (max-width: 768px) {
    padding-left: 0;
    padding-top: 0;
    margin-bottom: 0;
  }
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
  padding: 0px;
  margin-right: 10px;
  &.navicon {
    display: none;
  }
  @media screen and (max-width: 768px) {
    margin-right: 10px;
    &.navicon {
      display: flex;
      margin-right: 0;
      padding-left: 5px;
    }
    display: flex;
    padding-left: 15px;
    font-size: 25px;

    &.navicon::after {
      content: "";
      width: 1px;
      height: 20px;
      margin-right: 0px;
      margin-left: 13px;
      background: black;
    }
  }
`;
export const Title = styled.div`
  margin-right: auto;
  font-weight: bold;
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
    padding: 5px 10px;
    cursor: pointer;
    text-transform: uppercase;
  }
`;

export const MNavClose = styled.div`
 margin-right: 2px;
    margin-top: 5px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: none;
  color: black;
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
