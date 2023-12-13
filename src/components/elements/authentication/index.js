import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../common/elements/loader";
import Message from "../common/elements/message";
import Login from "../common/pages/login/login";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const loggedIn = useSelector((state) => state.login);
    const [meessage, setMessage] = useState({
      type: 1,
      content: "This message is asking your permission",
      proceed: "Proceed",
    });
    const [showMessage, setShowMessage] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    useEffect(() => {
      if (!loggedIn) {
        props.history.push("/login");
      }
    }, [loggedIn, props.history]);
    const setLoaderBox = (status) => {
      setShowLoader(status);
    };
    const setMessageBox = (messageContent) => {
      setMessage(messageContent);
      setShowMessage(true);
    };
    const closeMessage = () => {
      setShowMessage(false);
    };
    if (!loggedIn) {
      return <Login />;
    }
    return (
      <React.Fragment>
        <WrappedComponent setLoaderBox={setLoaderBox} setMessage={setMessageBox} {...props} />
        {showMessage && <Message meessage={meessage} closeMessage={closeMessage} setLoaderBox={setLoaderBox} showMessage={showMessage}></Message>}
        {showLoader && <Loader></Loader>}
      </React.Fragment>
    );
  };
};

export default withAuth;
