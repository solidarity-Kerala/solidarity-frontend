// its middlewear to handle reducer call to update a state

import { postData } from "../../../backend/api";

const fetchLogin = (data) => {
  return (dispatch) => {
    dispatch({
      type: "FETCH_USER_LOGIN_LOADING",
    });
    postData(data, "auth/login")
      .then((response) => {
        if (response.status === 200) {
          let currentMenu = response.data.menu.find((item) => item.path === "/dashboard");
          currentMenu = currentMenu ? currentMenu : response.data.menu.find((item) => !item.submenu);
          dispatch({
            type: "MENU_STATUS",
            payload: false,
          });
          dispatch({
            type: "SELECTED_MENU",
            payload: currentMenu ?? { label: "dashboard", icon: "dashboard" },
          });
          dispatch({
            type: "CURRENT_MENU",
            payload: currentMenu.label ?? "dashboard",
          });
          dispatch({
            type: "FETCH_USER_LOGIN_SUCCESS",
            payload: response.data,
          });
        } else {
          dispatch({
            type: "FETCH_USER_LOGIN_ERROR",
            payload: "validationFailed",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_USER_LOGIN_ERROR",
          payload: "validationFailed",
        });
      });
  };
};
const clearLogin = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_USER_LOGIN",
    });
  };
};
const clearLoginSession = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_USER_LOGIN_SESSION",
    });
  };
};
const udpateLogin = (data) => {
  return (dispatch) => {
    dispatch({
      type: "FETCH_USER_LOGIN_SUCCESS",
      payload: data,
    });
  };
};
export { fetchLogin, clearLogin, clearLoginSession, udpateLogin };
