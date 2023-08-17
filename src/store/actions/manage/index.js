// export const addPageObject = (pageObject) => ({
//     type: 'ADD_PAGE_OBJECT',
//     payload: pageObject
// });

import { getData } from "../../../backend/api";

export const addNewActionList = (page, id, index = 0) => {
  return async (dispatch) => {
    dispatch({
      type: "NEW_ACTION_LIST_LOADING",
      key: `${page}-${id}`,
    });
    await getData({ skip: index, limit: 10 }, `${page}/${id}`)
      .then((response) => {
        dispatch({
          type: "NEW_ACTION_LIST",
          payload: { ...response, isLoading: false },
          key: `${page}-${id}`,
        });
      })
      .catch((error) => {
        dispatch({
          type: "NEW_ACTION_LIST",
          payload: error,
        });
      });
  };
};
export const addAddedActionList = (page, id, index = 0) => {
  return async (dispatch) => {
    dispatch({
      type: "ADDED_ACTION_LIST_LOADING",
      key: `${page}-${id}`,
    });
    await getData({ skip: index, limit: 10 }, `${page}/${id}`)
      .then((response) => {
        dispatch({
          type: "ADDED_ACTION_LIST",
          payload: { ...response, isLoading: false },
          key: `${page}-${id}`,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ADDED_ACTION_LIST",
          payload: error,
        });
      });
  };
};
