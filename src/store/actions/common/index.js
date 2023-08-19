// its middlewear to handle reducer call to update a state
const menuStatus = (value) => ({
  type: "MENU_STATUS",
  payload: value,
});
const currentMenu = (value) => ({
  type: "CURRENT_MENU",
  payload: value,
});
const openedMenu = (value) => ({
  type: "OPENED_MENU",
  payload: value,
});
const selectedMenu = (value) => ({
  type: "SELECTED_MENU",
  payload: value,
});
export { menuStatus, currentMenu, openedMenu, selectedMenu };
