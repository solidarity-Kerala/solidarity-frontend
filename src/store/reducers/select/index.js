const initialState = {};

function select(state = initialState, action) {
  switch (action.type) {
    case "ADD_SELECT_OBJECT":
      const item = { ...state, [action.api]: action.payload };
      return item;
    default:
      return state;
  }
}

export { select };
