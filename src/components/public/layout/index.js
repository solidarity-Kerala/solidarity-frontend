import React, {useState } from "react";
import Loader from "../../elements/loader";
import Message from "../../elements/message";
// import Login from "../../../public/login";
const withLayout = (WrappedComponent) => {
  return (props) => {
    const [meessage, setMessage] = useState({
      type: 1,
      content: "Your session is expired!, Please login with your License Plate and File Number!",
      okay: "Start Over",
    });
    const [showMessage, setShowMessage] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const setLoaderBox = (status) => {
      setShowLoader(status);
    };
    const setMessageBox = (messageContent) => {
      setMessage(messageContent);
      setShowMessage(true);
    };
    const closeMessage = () => {
      setMessage({ ...meessage, onClose: null });
      setShowMessage(false);
    };
    return (
      <React.Fragment>
        <WrappedComponent {...props} setLoaderBox={setLoaderBox} setMessage={setMessageBox}></WrappedComponent>
        {showMessage && <Message meessage={meessage} closeMessage={closeMessage} setLoaderBox={setLoaderBox} showMessage={showMessage}></Message>}
        {showLoader && <Loader></Loader>}
      </React.Fragment>
    );
  };
};

export default withLayout;
