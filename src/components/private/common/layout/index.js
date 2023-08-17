import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../elements/loader";
import Message from "../../../elements/message";
import { clearLogin } from "../../../../store/actions/login";

/**
 * withLayout HOC that wraps a component and adds the layout elements to it.
 * @param {component} WrappedComponent The component to wrap with the layout.
 * @returns {function} The higher order component.
 */
const withLayout = (WrappedComponent) => {
  /**
   * The higher order component.
   * @param {object} props Props to pass down to the wrapped component.
   * @returns {jsx} The component with the layout.
   */
  return (props) => {
    // Use useNavigate hook from react-router-dom to navigate programmatically.
    const navigate = useNavigate();
    // Use useDispatch hook from react-redux to dispatch actions.
    const dispatch = useDispatch();
    // State for the message to display.
    const { t } = useTranslation();
    // t is using to translate the content
    const [meessage, setMessage] = useState({
      type: 1,
      content: t("sessionExpired"),
      okay: t("startOver"),
      onClose: () => {
        navigate("/");
        dispatch(clearLogin());
      },
    });
    // State to keep track of whether to show the message or not.
    const [showMessage, setShowMessage] = useState(false);
    // State to keep track of whether to show the loader or not.
    const [showLoader, setShowLoader] = useState(false);
    /**
     * Function to set the showLoader state.
     * @param {boolean} status The status of the loader.
     */
    const setLoaderBox = useCallback((status) => {
      setShowLoader(status);
    }, []);
    /**
     * Function to set the message to display.
     * @param {object} messageContent The content of the message.
     */
    const setMessageBox = (messageContent) => {
      setMessage(messageContent);
      setShowMessage(true);
    };
    /**
     * Function to close the message.
     */
    const closeMessage = () => {
      setMessage({ ...meessage, onClose: null });
      setShowMessage(false);
    };
    // Get the vehicle state from the redux store.
    const user = useSelector((state) => state.login);
    // Get the menu status from the redux store.
    /**
     * Effect to update the showLoader state when the vehicle data changes.
     */
    useEffect(() => {
      if (user.data.token) {
        setShowLoader(false);
      }
    }, [user]);
    return user.data.token ? (
      <React.Fragment>
        {/* <MainContainer>
          <SideBar theme={themeColors} className={menuStatus && "active"}>
            <Menu user={user.data}></Menu>
            <Footer></Footer>
          </SideBar>
          <RowContainer className="content">
            <Header user={user.data}></Header>
            <Container> */}
              <WrappedComponent
                user={user.data}
                {...props}
                setLoaderBox={setLoaderBox}
                setMessage={setMessageBox}
              ></WrappedComponent>
              {showMessage && (
                <Message
                  meessage={meessage}
                  closeMessage={closeMessage}
                  setLoaderBox={setLoaderBox}
                  showMessage={showMessage}
                ></Message>
              )}
              {showLoader && <Loader></Loader>}
            {/* </Container>
          </RowContainer>
        </MainContainer> */}
      </React.Fragment>
    ) : (
      <Message
        meessage={meessage}
        closeMessage={closeMessage}
        setLoaderBox={setLoaderBox}
        showMessage={showMessage}
      ></Message>
    );
  };
};

export default withLayout;
