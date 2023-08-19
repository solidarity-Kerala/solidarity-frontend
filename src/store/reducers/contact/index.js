// The themeColor property will intially share the theme color for the user.
// This color we using all the pages.
// I fwe change the color here all the project will be effected.

const concerns = {
  data: null,
  isLoading: true,
  error: null,
};

// This is the function we use to update the state of redux it initiailly as above. Any where in the apllication programer can call this reducers to update the redux.

function concernsReducer(state = concerns, action) {
  switch (action.type) {
    case "FETCH_CONTACT_CONCERNS":
      return {
        ...state,
        data: action.payload,
        error: null,
        isLoading: false,
      };
    case "FETCH_CONTACT_CONCERNS_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
function selectedConcernRedcucer(state = null, action) {
  switch (action.type) {
    case "SELECTED_CONCERN":
      return action.payload;
    default:
      return state;
  }
}
export { concernsReducer, selectedConcernRedcucer };

// themColor: initial theme color for the application, it could be retrieved from local storage if previously saved.
// themColorReducer: a Redux reducer function to update the theme color state based on the action type "THEME".
// It updates the theme color state with the payload data and also saves the theme color data to the local storage for persistence.
// The default value of the state is the initial theme color.
