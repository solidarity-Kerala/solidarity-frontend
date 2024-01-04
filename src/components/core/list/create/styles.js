import styled, { keyframes } from "styled-components";
export const Form = styled.div`
  border: 1px solid rgb(224, 224, 227);
  padding: .5em 0px;
  border-left: 10px;
  border-right: 0;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &.double {
    display: flex;
    grid-template-columns: 1fr 1fr;
    flex-flow: wrap;
  }
  @media (max-width: 768px) {
    border: 0;
    &.double {
      display: flex;
    }
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
  background-color: rgba(0, 0, 0, 0.2);
  overflow: auto;
  z-index: 1001;
  &.plain {
    position: initial;
    background: transparent;
    padding: 0;
  }
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
  background-color: white;
  border-radius: 10px;
  width: 30%;
  min-width: 250px;
  max-width: 100%;
  height: auto;
  animation: ${zoomAnimation} 1s ease-in-out;
  animation-duration: 0.2s;
  margin: auto;
  padding: 1em 2em;
  &.double {
    width: 50%;
  }
  &.fullscreen {
    width: 100%;
  }
  &.plain {
    border: 1px solid rgb(224, 224, 227);
    padding: 1em;
    border-radius: 10px;
  }
  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    top: 0;
    padding: 0;
    &.double {
      width: 100%;
    }
  }
`;
export const Header = styled.div`
  text-align: center;
  padding: 0.5em 0 1em;
  font-weight: 500;
  font-size: 1.3em;
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
export const LnputLayout = styled.div`
  display: flex;
  &.single {
  }
  &.double {
  }
`;
