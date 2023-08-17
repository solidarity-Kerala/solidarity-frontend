// The themeColor property will intially share the theme color for the user.
// This color we using all the pages.
// I fwe change the color here all the project will be effected.

const initiailUsers = {
  data: null,
  isLoading: true,
  error: null,
};
const initiailUser = {
  data: {},
  isLoading: true,
  error: null,
};
// This is the function we use to update the state of redux it initiailly as above. Any where in the apllication programer can call this reducers to update the redux.

function usersReducer(state = initiailUsers, action) {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case "FETCH_USERS_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
function userReducer(state = initiailUser, action) {
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case "FETCH_USER_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
export { usersReducer, userReducer };

// themColor: initial theme color for the application, it could be retrieved from local storage if previously saved.
// themColorReducer: a Redux reducer function to update the theme color state based on the action type "THEME".
// It updates the theme color state with the payload data and also saves the theme color data to the local storage for persistence.
// The default value of the state is the initial theme color.
