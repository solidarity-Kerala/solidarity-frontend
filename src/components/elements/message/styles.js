import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-content: center;
  @media (max-width: 768px) {
    position: sticky;
    bottom: 0;
    z-index: 1;
    padding-bottom: 10px;
    border-top: 1px solid rgb(224, 224, 227);
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
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    top: 0;
    bottom: 0;
    border-top: 1px solid rgb(224, 224, 227);
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
  animation: ${fadeIn} 1s ease-in-out;
  animation-duration: 0.2s;
  margin: auto;
  padding: 1em;
  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    top: 0;
    padding: 0;
    margin: 10px;
  }
`;

export const Content = styled.div`
  text-align: center;
  margin-top: 10px;
  padding-bottom: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  padding: 0px 22px;
  min-height: 40px;
`;
