const initialState = {};

function select(state = initialState, action) {
  switch (action.type) {
    case "ADD_SELECT_OBJECT":
      if (action.payload) {
        return { ...state, [action.api]: action.payload };
      } else {
        const { [action.api]: deletedItem, ...remainingItems } = state;
        return remainingItems;
      }
    default:
      return state;
  }
}
function clearselect(state = initialState, action) {
  switch (action.type) {
    case "CLEAR_SELECT_OBJECT":
      console.log(state);
      const { [action.api]: deletedItem, ...remainingItems } = state;
      console.log(remainingItems);
      return remainingItems;
    default:
      return state;
  }
}
export { select, clearselect };
