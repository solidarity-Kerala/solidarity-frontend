//this file contains the common conatiner styles like ColumnContainer, RowContainer etc

import { Link } from "react-router-dom";
import styled from "styled-components";

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex: 1 1 100%;
  &.custom {
    margin: 0px 10px 10px 30px;
    position: "relative";
    column-gap: 20px;
  }
  &.diret {
    justify-content: "space-between";
  }
  &.diet {
    margin: 20px 0px 0;
  }
  &.shadow {
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  }
  &.header {
    overflow: initial;
  }
  &.gap {
    gap: 10px;
  }
  &.filter {
    gap: 10px;
  }
  &.close {
    display: none;
  }
  &.filter {
    gap: 0;
    column-gap: 10px;
    flex-wrap: wrap;
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
  /* background-color: ${(props) => props.theme.pageBackground}; */
  &.quarter {
    width: 300px;
    flex: 1 1 300px;
    min-width: 300px;
    position: sticky;
    top: 0px;
  }
  &.order {
    margin-top: 20px;
  }
  &.mealSelection {
    padding-right: 30px;
    position: absolute;
    right: 0;
    top: 0;
    max-width: 400px;
    width: 400px;
    flex: 1 1 400px;
    bottom: 0;
    top: 0;
    overflow: scroll;
  }
  &.user-details {
    padding-right: 30px;
    max-width: 400px;
    width: 400px;
    flex: 1 1 400px;
    overflow: scroll;
    padding: 0px 30px;
    position: relative;
    position: sticky;
    top: 0;
    max-height: calc(100vh - 100px);
    display: grid;
  }
  &.menu-schedule {
    position: relative;
    max-width: calc(100% - 450px);
    width: calc(100% - 450px);
    flex: 1 1 calc(100% - 450px);
    padding: 0px 30px;
    max-height: calc(100vh - 100px);
    overflow: auto;
    @media screen and (max-width: 768px) {
      max-width: calc(100%);
      width: calc(100%);
      flex: 1 1 calc(100%);
    }
  }
  &.menu {
    max-width: calc(100% - 450px);
    width: calc(100% - 450px);
    position: absolute;
    left: 0;
    flex: 1 1 calc(100% - 450px);
    overflow: scroll;
    bottom: 0;
    top: 0;
  }
  &.true {
    max-width: calc(100% - 0px);
    width: calc(100% - 0px);
    flex: 1 1 calc(100% - 0px);
  }
  &.content {
    flex: 1 1 calc(100% - 15em);
    max-width: calc(100% - 15em);
    height: 100vh;
  }
  &.hidemenu {
    flex: 1 1 calc(100%);
    max-width: calc(100%);
  }
  &.popup-data {
    overflow: auto;
    padding: 0em 0 0;
    border-radius: 12px;
    min-height: 100px;
    display: flex;
  }
  &.popup-data.small {
    overflow: auto;
    padding: 0em 0 0;
    border-radius: 12px;
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
  &.menu-header {
    margin-left: 30px;
    margin-right: 30px;
    flex: 0;
    margin-bottom: 10px;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 10px;
  }
  &.order-page {
    margin-left: 30px;
    margin-right: 30px;
    flex: 0;
    margin-bottom: 10px;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 30px;
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
    .vertical-menu & {
      padding: 0px 20px 0 0;
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
  .data-layout {
    padding: 1.65em 2em 0;
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
  &.subList {
    border-radius: 12px;
  }
  &.print {
    padding: 0;
  }
  &.data-layout {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 84px);
    max-width: 100%;
  }
  && {
    .custom &.data-layout {
      padding: 0em 0em;
    }
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
