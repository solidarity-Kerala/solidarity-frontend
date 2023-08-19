import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import { MainContainer } from "../../common/layout/styels";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../elements/message";
import { clearLogin } from "../../../../store/actions/login";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Page404 = (props) => {
  const user = useSelector((state) => state.login);
  const { t } = useTranslation();
  // Use useNavigate hook from react-router-dom to navigate programmatically.
  const navigate = useNavigate();
  // Use useDispatch hook from react-redux to dispatch actions.
  const dispatch = useDispatch();
  //to update the page title
  useEffect(() => {
    document.title = `404 - Diet Food Management Portal`;
  }, []);
  const [meessage, setMessage] = useState({
    type: 1,
    content: t("sessionExpired"),
    okay: t("startOver"),
    onClose: () => {
      navigate("/");
      dispatch(clearLogin());
    },
  });
  /**
   * Function to close the message.
   */
  const closeMessage = () => {
    setMessage({ ...meessage, onClose: null });
    // setShowMessage(false);
  };
  // const [showMessage, setShowMessage] = useState(false);
  console.log(user.data.token);
  // Use the useTranslation hook from react-i18next to handle translations
  // const parkingDuration = totalDuration > 120 ? (days > 0 ? days + `d, ` : ``) + (hours > 0 ? hours + `h, ` : ``) + (minutes + t("m")) : totalDuration.toFixed(0) + ` ` + t("minutes");
  return user.data.token ? <MainContainer className="center"></MainContainer> : <Message meessage={meessage} closeMessage={closeMessage} setLoaderBox={() => {}} showMessage={true}></Message>;
};
// exporting the page with parent container layout..
export default Layout(Page404);
