// The themeColor property will intially share the theme color for the user.
// This color we using all the pages.
// I fwe change the color here all the project will be effected.

const userDetails = {
  data: localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : {},
  isLoading: false,
  error: null,
};
// This is the function we use to update the state of redux it initiailly as above. Any where in the apllication programer can call this reducers to update the redux.

function userLoginDetailsReducer(state = userDetails, action) {
  switch (action.type) {
    case "FETCH_USER_LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_USER_LOGIN_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "FETCH_USER_LOGIN_LOADING":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "CLEAR_USER_LOGIN":
      localStorage.removeItem("user");
      localStorage.removeItem("selectedMenu");
      localStorage.removeItem("menuStatus");
      return {
        ...userDetails,
        data: JSON.stringify({}),
      };
    default:
      return state;
  }
}
export { userLoginDetailsReducer };

// themColor: initial theme color for the application, it could be retrieved from local storage if previously saved.
// themColorReducer: a Redux reducer function to update the theme color state based on the action type "THEME".
// It updates the theme color state with the payload data and also saves the theme color data to the local storage for persistence.
// The default value of the state is the initial theme color.
