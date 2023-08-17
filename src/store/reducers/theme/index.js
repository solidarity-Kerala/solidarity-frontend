// The themeColor property will intially share the theme color for the user.
// This color we using all the pages.
// I fwe change the color here all the project will be effected.

const themColor =
  localStorage.getItem("_theme") !== null
    ? JSON.parse(localStorage.getItem("_menu"))
    : {
      pageBackground:'#EAEAEA;',
      background: 'white',
      foreground: '#4f4f4f',
      border: '#d9d9d9',
      secBackground: 'rgb(243, 243, 243)',
      secForeground: 'black',
      lightBackground: 'White',
      lightForeground: 'Black',
      lightBorder: 'Black',
      lightSecBackground: 'White',
      lightSecForeground: "#969696",
      foregroundInvert:'white',
      backgroundInvert:'#969696;',
      borderThinkness:'0px',
      themeBackground:'#FFFFFF',
      themeForeground:'black',
      disabledBackground:'rgba(156, 156, 156, 0.41)',
      disabledForeground:'white',
      };

// This is the function we use to update the state of redux it initiailly as above. Any where in the apllication programer can call this reducers to update the redux.

function themColorReducer(state = themColor, action) {
  switch (action.type) {
    case "THEME":
      // Saving the last selected colot theme to the local storage for persist in the system.
      localStorage.setItem("_theme", JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
}
export { themColorReducer };

// themColor: initial theme color for the application, it could be retrieved from local storage if previously saved.
// themColorReducer: a Redux reducer function to update the theme color state based on the action type "THEME".
// It updates the theme color state with the payload data and also saves the theme color data to the local storage for persistence.
// The default value of the state is the initial theme color.
