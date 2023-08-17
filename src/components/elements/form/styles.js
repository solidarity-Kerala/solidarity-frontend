import styled, { keyframes } from "styled-components";
export const Form = styled.section`
  flex-direction: column;
  flex: 1;
  position:relative;
  &.popup {
    border: 1px solid rgb(224, 224, 227);
    padding: 1em;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  &.plain {
    border-radius: 10px;
    display: flex;
  }
  &.sub {
    flex: 100%;
    padding: 0;
    border: 0;
    border-radius: 0;
  }
  @media (max-width: 768px) {
    &.popup {
      border: 0;
    }
  }
`;
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  &.popup {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 25px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    overflow: auto;
    z-index: 1001;
  }
  &.plain {
    box-shadow: rgb(0 0 0 / 16%) 0px 5px 9px 0px;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
  }
  @media (max-width: 768px) {
    &.popup {
      width: 100%;
      padding: 0;
      top: 0;
      bottom: 0;
      border-top: 1px solid rgb(224, 224, 227);
    }
    &.plain {
    }
  }
`;
export const Page = styled.div`
  &.popup {
    display: flex;
    flex-direction: column;
    display: flex;
    background-color: white;
    border-radius: 10px;
    width: 700px;
    min-width: 200px;
    max-width: 70%;
    height: auto;
    animation: ${fadeIn} 1s ease-in-out;
    animation-duration: 0.2s;
    margin: auto;
    padding: 1em;
  }
  &.plain {
    min-width: 250px;
    width: 400px;
    max-width: 100%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    &.popup {
      width: 100%;
      position: relative;
      top: 0;
      padding: 0;
      max-width: 100%;
    }
    &.plain {
    }
  }
`;
export const Header = styled.div`
  text-align: left;
  padding: 0.5em 0 0.5em;
  font-weight: 500;
  font-size: 1.5em;
  &.popup {
    text-align: center;
  }
  @media (max-width: 768px) {
    &.popup {
      position: sticky;
      padding: 1em 0 1em;
    }
    font-size: 18px;
    top: 0;
    background: white;
    z-index: 1;
    border-bottom: 1px solid rgb(224, 224, 227);
  }
`;
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-content: center;
  margin-top: 10px;
  &.left {
    justify-content: left;
  }
  @media (max-width: 768px) {
    position: sticky;
    bottom: 0;
    background: white;
    padding-bottom: 10px;
    border-top: 1px solid rgb(224, 224, 227);
  }
`;
export const ErrorMessage = styled.div`
  padding-left: 0;
  margin: -6px 7px 8px;
  color: #fe7b7b;
  font-size: 12px;
  width: 100%;
  &.image
  {
    margin: 0;
  }
`;
export const Description = styled.div`
  flex: 1 1 100%;
  margin: 10px 0;
  display: flex;
  && {
    .popup & {
      margin: 0 0 10px;
      justify-content: center;
      text-align: justify;
      border: 1px solid rgb(224, 224, 227);
      border-radius: 10px;
      padding: 10px 20px;
      font-size: 14px;
      /* background-color: #e7f2f9; */
    }
  }

  @media (max-width: 768px) {
    && {
      .popup & {
        border: 0px solid rgb(224, 224, 227);
        background-color: #e7f2f9;
        border-radius: 10px;
        margin: 15px 15px 0px;
        padding: 10px;
      }
    }
  }
`;

export const Plus = styled.div`
  background: transparent;
  transition: 0.2s;
  &:hover{
    transform:scale(1.3);
  }
`;
export const ButtonContanter = styled.aside`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px;
  outline: none !important;
  width: 100%;
  border-radius: 10px;
  border: 0px solid Black;
  margin: 0 0px 10px 0;
  padding-left: 1em;
  font-weight: 700;
  box-shadow: none;
  -webkit-appearance: none;
  -webkit-transition: all 0.2s ease-out 0s;
  transition: all 0.2s ease-out 0s;
  color: #4f4f4f;
  background: #e7f2f9;
  text-align: center;
  transition: 0.5s;
  &.close
  {
    position: absolute;
    right: 10px;
    top: 15px;
    background: transparent;
    width: 25px;
    height: 20px;
    padding: 1px;
    color: black;
  }
  button {
    transition: 0.5s;
    background-color: transparent;
    border: 0;
    display: flex;
    flex-direction: column;
    margin: auto;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
      font-size: 20px;
      margin-bottom: 15px;
    }
  }
`;