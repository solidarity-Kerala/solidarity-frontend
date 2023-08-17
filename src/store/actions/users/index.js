// its middlewear to handle reducer call to update a state

import { getData } from "../../../backend/api";

const fetchUsers = (skip = 0, limit = 10) => {
  return (dispatch) => {
    getData({ skip: skip, limit: limit }, "user")
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "FETCH_USERS_SUCCESS",
            payload: response.data,
          });
        } else {
          dispatch({
            type: "FETCH_USERS_ERROR",
            payload: "FAQ groups not found!",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_USERS_ERROR",
          payload: error,
        });
      });
  };
};
const fetchUser = (id) => {
  return (dispatch) => {
    getData({}, `user/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "FETCH_USER_SUCCESS",
            payload: response.data,
            id: id,
          });
        } else {
          dispatch({
            type: "FETCH_USER_ERROR",
            payload: "FAQ group not found!",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_USER_ERROR",
          payload: error,
        });
      });
  };
};
export { fetchUsers, fetchUser };
