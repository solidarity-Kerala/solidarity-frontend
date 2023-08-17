import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import { GetIcon } from "../../../icons";
import { Editor } from "./styles";
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    [{ align: [] }], // add justify format
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "video", "color", "background", "script", "align", "direction", "code-block", "formula", "clean"];

const EditorNew = (props) => {
  const [showEditor, setShowEditor] = useState(false);
  // const [quill, setQuill] = useState(null); // Add state for the quill component

  // const handleLoad = (quill) => {
  //   console.log("Quill instance loaded:", quill);
  //   setQuill(quill);
  //   if (quill && quill.clipboard) {
  //     // add null check
  //     quill.clipboard.addMatcher("img", (node, delta) => {
  //       // ... your custom matcher code here
  //       return delta;
  //     });
  //   }
  // };

  // // const [modalIsOpen] = useState(props.isCreating);

  const openFullScreen = () => {
    setShowEditor(!showEditor);
  };
  return (
    <Overlay className={showEditor && "open"}>
      <Page className={showEditor && "open"}>
        <Editor
          theme="snow"
          value={props.value}
          formats={formats}
          modules={modules}
          onChange={(event) => {
            props.onChange(event, props.id, props.type);
          }}
        />
        <Button onClick={() => openFullScreen()}>
          {showEditor ? (
            <>
              <span>Close Full screen</span>
              <GetIcon icon={"Close"}></GetIcon>
            </>
          ) : (
            <>
              <span>Open Full Screen</span>
              <GetIcon icon={"enlarge"}></GetIcon>
            </>
          )}
        </Button>
      </Page>
    </Overlay>
  );
};

export default EditorNew;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
// const Footer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   justify-content: center;
//   @media (max-width: 768px) {
//     position: sticky;
//     bottom: 0;
//     background: white;
//     z-index: 1;
//     padding-bottom: 10px;
//     border-top: 1px solid rgb(224, 224, 227);
//   }
// `;
const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  z-index: 1001;
  p {
    text-align: initial;
  }
  &.open {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 25px 0;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    top: 0;
    bottom: 0;
    border-top: 1px solid rgb(224, 224, 227);
  }
`;
const Button = styled.div`
  background-color: transparent;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  align-items: center;
  align-self: end;
  svg,
  i {
    margin-left: 10px;
  }
`;
const Page = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  background-color: white;
  border-radius: 10px;
  max-height: 300px;
  width: 100%;
  &.open {
    width: 30%;
    min-width: 1200px;
    max-width: 100%;
    height: auto;
    animation: ${fadeIn} 1s ease-in-out;
    animation-duration: 0.2s;
    margin: auto;
    padding: 1em;
    max-height: 90%;
    overflow: auto;
  }
  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    top: 0;
    padding: 0;
  }
`;
