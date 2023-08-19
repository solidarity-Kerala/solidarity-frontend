import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { themColorReducer } from "./reducers/theme";
import thunk from "redux-thunk";
import { currentMenuReducer, menuStatusReducer, openMenuReducer, selectedMenuReducer } from "./reducers/common";
import { userLoginDetailsReducer } from "./reducers/login";
import { userReducer, usersReducer } from "./reducers/users";
import { select } from "./reducers/select";
import { pages } from "./reducers/pages";
import { actionAddedList, actionNewList } from "./reducers/manage";

const rootReducer = combineReducers({
  themeColors: themColorReducer,
  login: userLoginDetailsReducer,
  users: usersReducer,
  user: userReducer,
  menuStatus: menuStatusReducer,
  currentMenu: currentMenuReducer,
  openedMenu: openMenuReducer,
  select: select,
  pages: pages,
  actionNewList: actionNewList,
  actionAddedList: actionAddedList,
  selectedMenu: selectedMenuReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

// In this code, we first import the necessary functions and libraries from redux and redux-thunk.
// Next, we import the themColorReducer, etc from the ./reducers folders, which manages the state of purticular state in the Redux store.
// The rootReducer is then created by combining the themColorReducer with any other possible reducers using the combineReducers function from redux.
// Finally, the Redux store is created using the createStore function from redux and the rootReducer. The applyMiddleware function is used to apply the thunk middleware to the store, allowing for asynchronous actions in the application.
// The store is then exported so that it can be imported and used in other parts of the application.
