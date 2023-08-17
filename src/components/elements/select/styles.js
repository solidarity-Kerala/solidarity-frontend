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
  &.half:nth-child(even) {
    width: calc(50% - 5px);
    margin-right: 5px;
  }
  flex: calc(50% - 10px);
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
      width: calc(50% - 7px);
    }
  }
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
    height: 50px;
    padding-left: 1em;
    font-weight: 700;
    box-shadow: none;
    -webkit-transition: all 0.2s ease-out 0s;
    transition: all 0.2s ease-out 0s;
    color: ${(props) => props.theme.secForeground};
    background: ${(props) => props.theme.secBackground};
    text-align: left;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0 0px 10px 0;
  }
  &.filter button {
    min-height: 40px;
    height: 40px;
    margin: 4px 0;
    min-width: 150px;
    background: ${(props) => props.theme.background};
  }
  &.filter {
    margin-right: 0.5em;
  }
  button label {
    display: none;
  }
  button label svg {
    color: green !important;
    transform: rotate(0deg) !important;
  }
  button.has {
    padding-top: 20px;
  }
  button.has label {
    position: absolute;
    display: block;
    font-weight: normal;
    top: 5px;
    left: 13px;
    font-size: 12px;
  }
  button.has svg:first-child {
    margin-right: 5px;
  }
  &.filter button.has label {
    font-size: 10px;
    top: 10px;
  }
  &.filter .options {
    top: 31px;
  }
  &.open svg.down {
    transition: all 0.2s ease-out 0s;
    transform: rotate(180deg);
    color: black;
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
    border: 1px solid rgb(224, 224, 227);
    border-radius: 12px;
    list-style: none;
    padding: inherit;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    top: 36px;
    transition: all 1s ease-out 0s;
  }
  .options li.true {
    background: ${(props) => props.theme.pageBackground};
    color: #0f0f0f;
    font-weight: bold;
    border-bottom: 1px solid rgb(224, 224, 227);
  }
  .options li {
    cursor: pointer;
    border-bottom: 1px solid rgb(224, 224, 227);
    padding: 10px 10px;
    margin: 0 00px;
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
`;
export const TagData = styled.div`
  display: flex;
  font-size: 12px;
  flex-wrap: wrap;
`;
export const ImgBox = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;
