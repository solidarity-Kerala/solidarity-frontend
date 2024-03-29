import styled from "styled-components";
export const SelectBox = styled.div`
  position: relative;
  width: 100%;

  &.half {
    width: 40%;
  }
  &.half:nth-child(odd) {
    width: calc(50% - 5px);
    margin-left: 5px;
  }
  &.small button {
    width: 80px;
    margin: 0;
  }
  .select {
    display: none;
  }
  &.list-box button {
    display: none;
  }
  &.list-box {
    max-height: none;
    height: auto;
  }
  &.auto {
    width: auto;
  }
  &.list-box .options {
    display: block;
    position: inherit;
    top: 0px;
    height: calc(100vh - 150px);
    max-height: inherit;
    padding-top: 0;
    margin-top: 0;
  }
  &.disabled {
    display: none;
  }
  &.half:nth-child(even) {
    width: calc(50% - 5px);
    margin-right: 5px;
  }
  flex: calc(50% - 10px);

  && {
    /* Styles to apply when parent has class shrink */
    .nowrap & {
      margin-right: 10px;
      margin-left: 0;
    }
  }
  button {
    outline: none !important;
    width: 100%;
    border-radius: 10px;
    border: 0px solid silver;
    height: 40px;
    padding-left: 1em;
    font-weight: 700;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 2px;
    -webkit-transition: all 0.2s ease-out 0s;
    transition: all 0.2s ease-out 0s;
    color: ${(props) => props.theme.secForeground};
    background: ${(props) => props.theme.secBackground};
    text-align: left;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0 0px 0px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &.custom {
    max-width: 200px;
    display: flex;
  }

  &.left {
    margin: 0;
    margin-right: auto;
  }
  &.right {
    margin: 0;
    margin-left: auto;
  }
  &.center {
    margin: 0;
    margin-left: auto;
    margin-right: auto;
  }
  &.custom button {
    min-height: 40px;
    min-width: 150px;
    font-weight: normal;
    background: ${(props) => props.theme.background};
  }
  &.filter button {
    min-height: 40px;
    height: 40px;
    margin: 4px 0;
    min-width: 150px;
    background: ${(props) => props.theme.background};
  }
  &.form {
    max-width: 100%;
    display: flex;
    button {
      font-weight: 700;
    }
  }
  &.filter {
    margin: 0px;
    flex: 1 1 250px; /* flex-grow, flex-shrink, flex-basis */
    max-width: 250px; /* Maximum width for flexibility */
  }
  &.single {
    margin-right: 0em;
  }
  button label {
    display: none;
  }
  button label svg {
    color: green !important;
    transform: rotate(0deg) !important;
  }
  button.has {
    padding-top: 15px;
  }
  button.has label {
    position: absolute;
    display: block;
    font-weight: normal;
    top: 5px;
    left: 13px;
    font-size: 10px;
  }
  button.has svg:first-child {
    margin-right: 5px;
  }
  &.filter button.has label {
    font-size: 10px;
    top: 10px;
  }
  &.filter .options {
    top: 50px;
    position: initial;
    margin: 0;
  }
  &.single .options {
    top: 47px;
    position: absolute;
    margin: 0px;
  }
  &.open svg.down {
    transition: all 0.2s ease-out 0s;
    transform: rotate(180deg);
    color: black;
  }
  &.open .options {
    border: 1px solid rgb(224, 224, 227);
    z-index: 1004;
  }
  &.open .select {
    display: inherit;
  }
  button svg {
    margin-left: auto;
    margin-right: 1em;
  }
  .options {
    opacity: 1;
    pointer-events: auto;
    -webkit-transform: scale(1) translateY(0);
    -ms-transform: scale(1) translateY(0);
    transform: scale(1) translateY(0);
    max-height: 250px;
    overflow-y: auto;
    width: 100%;
    background-color: white;
    border-color: rgb(224, 224, 227);
    border-radius: 12px;
    list-style: none;
    padding: inherit;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1004;
    margin: 0;
    top: 42px;
    transition: all 1s ease-out 0s;
  }
  .options li.selected {
    background: ${(props) => props.theme.pageBackground};
    color: #0f0f0f;
    font-weight: bold;
    border-bottom: 1px solid rgb(224, 224, 227);
  }
  .options li {
    cursor: pointer;
    border-bottom: 1px solid rgb(224, 224, 227);
    padding: 8px 12px;
    margin: 0px;
    font-size: 14px;
  }
  .options li svg {
    color: ${(props) => props.theme.lightSecForeground};
    margin-left: 10px;
    transform: rotate(0deg);
  }
  .options li:last-child {
    border-bottom: 0px solid rgb(224, 224, 227);
  }
  .options li:hover {
    background: ${(props) => props.theme.pageBackground};
    color: #0f0f0f;
    transform: scale(1.005);
    transition: all 0.4s;
  }
  @media screen and (max-width: 768px) {
    &.half:nth-child(odd) {
      width: 100%;
      margin-left: 0px;
    }
    &.half:nth-child(even) {
      width: 100%;
      margin-right: 0px;
    }
    &.filter {
      flex: 1 1 100%; /* flex-grow, flex-shrink, flex-basis */
      max-width: 200px; /* Maximum width for flexibility */
    }
  }
`;
export const Label = styled.label`
  position: absolute;
  pointer-events: none;
  top: 12px;
  left: 14px;
  font-size: 12px;
  transition: all 0.1s ease;
  color: ${(props) => props.theme.foreground};
  &.shrink {
    display: none;
  }
`;
export const Tag = styled.span`
  margin-top: 5px;
  display: flex;
`;
export const TagTitle = styled.span`
  display: flex;
  margin-right: 5px;
  margin-bottom: 5px;
  color: rgb(131, 136, 148);
  &:after {
    content: " :";
  }
`;
export const TagItem = styled.span`
  padding: 0px;
  border-radius: 10px;
  font-weight: 500;
  margin-right: 10px;
  &.image {
    padding: 0;
  }
`;
export const TagBox = styled.label`
  display: flex;
  font-size: 12px;
  flex-direction: row;
  margin-top: 10px;
  &.column {
    flex-direction: column;
    row-gap: 5px;
  }
`;
export const TagData = styled.div`
  display: flex;
  font-size: 12px;
  flex-wrap: wrap;
`;
export const ImgBox = styled.img`
  min-width: 50px;
  max-width: 50px;
  min-height: 50px;
  max-height: 50px;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 10px;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
`;
export const Button = styled.div`
  border: none;
  padding: 6px 6px;
  margin-right: 8px;
  cursor: pointer;
  font-size: 14px;
  /* white-space: nowrap; */
  border: 1px solid lightgray;
  margin-top: 10px;
  width: fit-content;
  border-radius: 10px;
  &:hover {
    background: white;
  }
`;
