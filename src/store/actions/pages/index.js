// export const addPageObject = (pageObject) => ({
//     type: 'ADD_PAGE_OBJECT',
//     payload: pageObject
// });

import { getData } from "../../../backend/api";

export const addPageObject = (page, index, filter = {}) => {
  return async (dispatch) => {
    dispatch({
      type: "ADD_PAGE_OBJECT_LOADING",
      key: page,
    });
    await getData({ ...filter, skip: index, limit: 10 }, page)
      .then((response) => {
        dispatch({
          type: "ADD_PAGE_OBJECT",
          payload: { ...response, isLoading: false },
          key: page,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADD_PAGE_OBJECT",
          payload: error,
        });
      });
  };
};
