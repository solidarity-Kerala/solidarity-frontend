// its middlewear to handle reducer call to update a state

import { getData } from "../../../backend/api";

const fetchContactConcerns = () => {
  return (dispatch) => {
    getData({}, "contact/concerns")
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "FETCH_CONTACT_CONCERNS",
            payload: response.data,
          });
        } else {
          dispatch({
            type: "FETCH_CONTACT_CONCERNS_ERROR",
            payload: "Concerns not found!",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_CONTACT_CONCERNS_ERROR",
          payload: error,
        });
      });
  };
};
const changeSelectedConcern = (value) => {
  return (dispatch) => {
    // if (value?.reason?.length > 1 ? true : false) {
    //   dispatch({ type: "SELECTED_CONCERN", payload: value });
    // }
    // else{
      dispatch({ type: "SELECTED_CONCERN", payload: value });
    // }
  };
};
export { fetchContactConcerns, changeSelectedConcern };
