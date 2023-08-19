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
export { fetchLogin, clearLogin };
