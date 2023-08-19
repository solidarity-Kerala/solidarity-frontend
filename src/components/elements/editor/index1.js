import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Quill from "quill";
import Delta from "quill-delta";
import "quill/dist/quill.snow.css";
import "./style.css";
import { dataURLToBlob } from "blob-util";
import styled, { keyframes } from "styled-components";
import { GetAccessToken } from "../../../../helpers/authentication";
import ImageResize from 'react-quill-image-resize-module';
Quill.register("modules/image-resize", ImageResize);
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

const Editor = (props) => {
  const [quill, setQuill] = useState(null);
  const quillRef = useRef();
  const [showEditor, setShowEditor] = useState(false);
  useEffect(() => {
    const toolbar = quillRef.current.querySelector(".ql-editor");
    if (!toolbar) {
      const newQuill = new Quill(quillRef.current, {
        modules: modules,
        placeholder: props.placeholder,
        theme: "snow",
      });
      // Set default value here
      newQuill.root.innerHTML = props.value;

      newQuill.on("text-change", () => {
        const html = quillRef.current.querySelector(".ql-editor").innerHTML;
        const text = quillRef.current.querySelector(".ql-editor").innerText;
        props.onChange(html, props.id, props.type);
        // props.onChange(html);
      });
      setQuill(newQuill);
    }
  }, [quillRef]);

  const handleUploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const token = GetAccessToken();
    try {
      const response = await axios.post("http://localhost:8000/api/common/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": token,
        },
      });
      const imageUrl = "http://localhost:8000/" + response.data.imageUrl;
      return imageUrl;
    } catch (error) {
      console.log("Error uploading image:", error);
      return null;
    }
  };

  const handleInsertImage = async (node) => {
    const blob = dataURLToBlob(node.getAttribute("src"));
    const imageUrl = await handleUploadImage(blob);
    if (imageUrl) {
      // remove the image node from the DOM
      node.remove();
      // delete the previous character in the Quill editor
      quill.deleteText(quill.getSelection().index - 1, 1);
      // insert the new image
      const delta = new Delta().retain(quill.getSelection().index || 0).insert({ image: imageUrl });
      quill.updateContents(delta);
    }
  };
  useEffect(() => {
    if (quill) {
      quill.clipboard.addMatcher("img", (node, delta) => {
        handleInsertImage(node);
        return delta;
      });
    }
  }, [quill]);

  // const [modalIsOpen] = useState(props.isCreating);

  const openFullScreen = () => {
    setShowEditor(!showEditor);
  };
  return (
    <Overlay className={showEditor && "open"}>
      <Page className={showEditor && "open"}>
        <div key={props.id} ref={quillRef}></div>
        {/* <ReactQuill
        theme="snow"
        value={props.value}
        modules={modules}
        formats={formats}
        onPaste={(event) => console.log("paste", event)}
        onChange={(event) => {
          // props.onChange(event);
          // console.log(event);
        }}
      /> */}
        {/* <Footer>
          <FormInput type="close" value={"Cancel"} onChange={closeModal} />
          <FormInput disabled={submitDisabled} type="submit" name="submit" value={props.button ? props.button : "Submit"} onChange={submitChange} />
        </Footer> */}
        <Button onClick={() => openFullScreen()}>
          {showEditor ? (
            <>
              <span>Close Full screen</span>
              <i className="fa-regular fa-xmark"></i>
            </>
          ) : (
            <>
              <span>Open Full Screen</span>
              <i className="fa-light fa-arrow-up-right-from-square"></i>
            </>
          )}
        </Button>
      </Page>
    </Overlay>
  );
};

export default Editor;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-content: center;
  @media (max-width: 768px) {
    position: sticky;
    bottom: 0;
    background: white;
    z-index: 1;
    padding-bottom: 10px;
    border-top: 1px solid rgb(224, 224, 227);
  }
`;
const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  z-index: 1001;
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
