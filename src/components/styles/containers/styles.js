//this file contains the common conatiner styles like ColumnContainer, RowContainer etc

import { Link } from "react-router-dom";
import styled from "styled-components";

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  &.shadow {
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  }
  &.header {
    overflow: initial;
  }
  && {
    .second & {
      justify-content: left;
      display: flex;
      align-items: baseline;
      img {
        margin-right: 10px;
      }
    }
  }
  &.booking-container {
    height: calc(100vh - 200px);
    overflow: auto;
  }
  &.center {
    margin: 50px auto;
    background-color: white;
    min-height: 120px;
    border-radius: 10px;
    flex-direction: column;
    justify-content: flex-start;
  }
  &.container {
    justify-content: center;
    max-width: 1200px;
    width: 100%;
    margin: auto;
  }
  &.login {
    height: calc(100vh);
    align-items: center;
    padding: 0;
  }

  &.left {
    justify-content: left;
  }
  h1 {
    font-size: 1.3em;
    margin: 50px 10px;
    text-align: center;
  }
  @media screen and (max-width: 1200px) and (min-width: 768px) {
    overflow: auto;
    &.container {
      justify-content: center;
      max-width: 768px;
      width: 100%;
    }
  }
  @media screen and (max-width: 768px) {
    overflow: auto;
    flex-wrap: wrap;
    &.booking-container {
      height: auto;
      overflow: initial;
    }
    &.container {
      margin: initial;
    }
    &.login {
      align-items: center;
      padding: 10px 10px;
    }
    h1 {
      font-size: 1em;
      margin: 15px 15px 10px;
      font-size: 20px;
      text-align: center;
    }
    &.center {
      margin: 20px 10px;
    }
  }
`;
export const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  margin-bottom: auto;
  &.content {
    flex: 1 1 calc(100% - 15em);
    max-width: calc(100% - 15em);
    height: 100vh;
  }
  &.marginright {
    margin-right: 15px;
  }
  p {
    text-align: center;
  }
  &.center p {
    margin: 0;
    margin-bottom: 50px;
  }
  .map-container {
    width: 100%;
    height: 100vh;
    border-radius: 10px 0 0 0;
    border-top: 1px solid #bdbdbd !important;
    border-left: 1px solid #bdbdbd !important;
  }
  h2 {
    font-size: 1.8em;
  }
  &.center {
    margin: auto;
    width: 400px;
    background-color: white;
    min-height: 120px;
    border-radius: 10px;
    flex: none;
  }
  && {
    .payment & {
      margin-right: 0px;
    }
    .second & {
      background-color: transparent;
    }
  }
  &.full {
    flex: 1 1 calc(100vh - 100px);
    margin-right: inherit;
  }
  &.center h2 {
    justify-content: center;
    text-align: center;
    margin: 2em 0em 1em;
  }
  &.features {
    background-color: white;
    padding-bottom: 50px;
  }
  &.second {
    background-color: rgb(241, 246, 248);
  }
  &.second.center {
    background-color: rgb(241, 246, 248);
  }
  &.white {
    background-color: white;
    align-items: center;
    justify-content: center;
    display: flex;
    padding-bottom: 70px;
    flex-basis: auto;
    h1 {
      max-width: 80%;
      font-size: 25px;
    }
    a {
      background: rgb(19, 129, 197);
      border-radius: 12px;
      color: white;
      transition: all 0.5s ease 0s;
      margin-top: 10px;
      max-width: 400px;
      padding: 15px 20px;
      min-width: 155px;
      border-color: black;
      border-style: solid;
      cursor: pointer;
      border-width: 0px;
      text-align: center;
      text-decoration: none;
    }
  }
  &.booking {
    flex: 1 1 500px;
    height: calc(100vh - 200px);
    overflow: auto;
    position: relative;
  }
  &.width60 {
    flex: 1 1 60%;
  }
  &.width40 {
    flex: 1 1 40%;
  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
    margin-right: 0px;
    .map-container {
      height: 400px;
      margin-bottom: 30px;
    }
    &.booking {
      height: auto;
      overflow: initial;
    }
    &.map {
      height: auto;
    }
    &.white {
      background-color: white;
      align-items: center;
      justify-content: center;
      display: flex;
      padding-bottom: 20px;
      flex-basis: auto;
      h1 {
        max-width: 80%;
        font-size: 17px;
      }
    }
    &.center {
      margin: auto;
      width: 250px;
      background-color: white;
      min-height: 120px;
      border-radius: 10px;
      flex: none;
    }
    &.content {
      flex: 1 1 calc(100% - 0em);
      max-width: calc(100% - 0em);
      height: 100vh;
    }
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Row = styled.div`
  display: flex;
  flex-direction: column;
  &.hide {
    display: none;
  }
  p {
    text-align: left;
  }
`;

export const LinkButton = styled(Link)`
  margin: 5px;
  text-decoration: none;
  background-color: #1381c5;
  color: white;
  padding: 5px 15px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  &:first-child {
    margin-left: 0;
  }
  svg {
    margin-right: 10px;
    color: white;
  }
`;
export const Points = styled.div`
  width: 33%;
  text-align: center;
  padding: 40px;
  h4 {
    color: #006dbf;
  }
  p {
    color: #7f7f7f;
    font-size: 16px;
  }
  img {
    height: 70px;
  }
  && {
    .second & {
      width: 50%;
      text-align: left;
      h4 {
        color: inherit;
        margin: 0;
      }
      p {
        text-align: left;
      }
    }
  }
  @media screen and (max-width: 768px) {
    width: calc(100% - 100px);
    margin: 10px;
    h4 {
      color: #006dbf;
      font-size: 26px;
    }
    p {
      color: #7f7f7f;
      font-size: 16px;
    }
  }
`;

export const SlidePopup = styled.div`
  position: absolute;
  left: 20px;
  right: 5px;
  top: auto;
  bottom: 0;
  background-color: white;
  min-height: 50%;
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 2px 0px;
  border-radius: 10px 10px 0 0;
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
    cursor: pointer;
  }
  button {
    font-weight: bold;
    margin: auto;
    width: 100%;
    border-radius: 10px;
  }
`;
