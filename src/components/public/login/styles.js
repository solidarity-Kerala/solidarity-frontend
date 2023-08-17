import styled from "styled-components";
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  padding-bottom: 50px;
  background-color: #f3f8fb;
  &.center {
    text-align: center;
    justify-content: center;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-bottom: 10px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 40%;
  margin-bottom: 60px;
  margin-top: 60px;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  margin: auto;
  margin: 40px auto;
  img {
    max-width: 100%;
  }
  @media screen and (max-width: 1200px) and (min-width: 768px) {
    max-width: 768px;
  }
  @media screen and (max-width: 768px) {
    flex: 1 1 100%;
    width: auto;
    padding: 10px;
    margin: 0px auto;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 64vh;
    object-fit: cover;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    &.hm {
      display: none;
    }
  }
`;
export const Header = styled.div`
  display: flex;
  padding: 10px;
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 9px 0px;
  background-color: white;
  img {
    height: 30px;
  }
`;
