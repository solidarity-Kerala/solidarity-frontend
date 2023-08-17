// The themeColor property will intially share the theme color for the user.
// This color we using all the pages.
// I fwe change the color here all the project will be effected.

const menuStatus = false;
const openedMenu = localStorage.getItem("menuStatus") !== null ? JSON.parse(localStorage.getItem("menuStatus")) : {};
const selectedMenu = localStorage.getItem("selectedMenu") !== null ? JSON.parse(localStorage.getItem("selectedMenu")) : { _id: 0 };
// This is the function we use to update the state of redux it initiailly as above. Any where in the apllication programer can call this reducers to update the redux.

function menuStatusReducer(state = menuStatus, action) {
  switch (action.type) {
    case "MENU_STATUS":
      return action.payload;
    default:
      return state;
  }
}
function selectedMenuReducer(state = selectedMenu, action) {
  switch (action.type) {
    case "SELECTED_MENU":
      localStorage.setItem("selectedMenu", JSON.stringify(action.payload));

      return action.payload;
    default:
      return state;
  }
}
function currentMenuReducer(state = "", action) {
  switch (action.type) {
    case "CURRENT_MENU":
      // Saving the last selected colot theme to the local storage for persist in the system.
      return action.payload;
    default:
      return state;
  }
}
function openMenuReducer(state = openedMenu, action) {
  switch (action.type) {
    case "OPENED_MENU":
      const { payload } = action;
      const newState = { ...state };

      // Check if the payload array exists in the state
      if (newState.hasOwnProperty(payload)) {
        // If the value is true, update it to false; otherwise, update it to true
        newState[payload] = !newState[payload];
      } else {
        // If the array doesn't exist, add it with a value of true
        newState[payload] = true;
      }

      // Saving the updated state to the local storage for persistence in the system
      // localStorage.setItem('openMenuState', JSON.stringify(newState));
      localStorage.setItem("menuStatus", JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
}

export { menuStatusReducer, currentMenuReducer, openMenuReducer, selectedMenuReducer };

// themColor: initial theme color for the application, it could be retrieved from local storage if previously saved.
// themColorReducer: a Redux reducer function to update the theme color state based on the action type "THEME".
// It updates the theme color state with the payload data and also saves the theme color data to the local storage for persistence.
// The default value of the state is the initial theme color.
