import styled, { keyframes } from "styled-components";
export const Form = styled.div`
  border: 1px solid rgb(224, 224, 227);
  padding: 1em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    border: 0;
  }
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: auto;
  z-index: 1001;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    top: 0;
    bottom: 0;
    border-top: 1px solid rgb(224, 224, 227);
  }
`;
const zoomAnimation = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  border-radius: 10px;
  width: 30%;
  min-width: 250px;
  max-width: 100%;
  height: auto;
  animation: ${fadeIn} 1s ease-in-out;
  /* animation: ${zoomAnimation} 1s ease-in-out; */
  animation-duration: 0.2s;
  margin: 5vh auto auto auto;
  padding: 0em 0;
  background-color: white;
  max-height: 90%;
  box-shadow: 0px 0px 3px 1px rgb(181 181 181 / 45%);
  
  &.medium {
    width: 70%;
    min-width: 250px;
    max-width: 100%;
  }
  &.large {
    width: 80%;
    min-width: 250px;
    max-width: 100%;
  }
  &.full-page
  {
    height:100vh;
    max-height:100vh;
     margin: 0;
     width:100%;
  }
  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    top: 0;
    padding: 0;
    &.medium {
      width: 100%;
      min-width: 250px;
      max-width: 100%;
      padding: 10px;
    }
  }
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 30px 0.5em;
  font-weight: 500;
  font-size: 1.3em;
  &.form {
    padding: 0.5em 0.5em;
  }
  &.small {
    padding: 5px;
    padding: 5px;
    border-bottom: 1px solid rgb(243, 243, 243);
    margin-bottom:10px;
  }
  &.small button {
    background-color: rgb(243, 243, 243);
    height: 30px;
    padding:5px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.small > span {
    font-size: 12px;
  }
  /* border-bottom: 1px solid rgb(204, 204, 204); */
  @media (max-width: 768px) {
    position: sticky;
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
  @media (max-width: 768px) {
    position: sticky;
    bottom: 0;
    background: white;
    padding-bottom: 10px;
    border-top: 1px solid rgb(224, 224, 227);
  }
`;
export const ErrorMessage = styled.div`
  border-left: 1px solid lightgrey;
  padding-left: 10px;
  margin: 0 0;
  color: #fe7b7b;
  font-size: 12px;
  width: 100%;
  text-align: left;
  float: left;
`;
export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
`;

export const TabHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 0;
  align-items: flex-end;
  height: 60px;
`;

export const Tab = styled.div`
  padding: 0px;
  background-color: white;
  display: none;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  ${(props) =>
    props.active &&
    `
    display: flex;
  `}
`;

export const TabLink = styled.div`
  cursor: pointer;
  padding: 10px;
  flex: 1 1 50%;
  background-color: #ddedeb;
  color: #77998e;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 30px;
  &:first-child {
    border-top-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
  }
  &.active {
    background-color: #ffffff;
    color: #77998e;
    height: 40px;
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

export const Section = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  flex: 1 1 100%;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  padding: 0;
  margin-bottom: 1em;
  margin: 1em;
  border-radius: 10px;
  background: #f3f8fb;
  padding-bottom: 10px;
`;
export const PlainSection = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 1em;
  margin-bottom: 1em;
`;
