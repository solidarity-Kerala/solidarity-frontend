const initialState = {};

function pages(state = initialState, action) {
  switch (action.type) {
    case "ADD_PAGE_OBJECT":
      return {
        ...state,
        [action.key]: action.payload,
      };
    case "ADD_PAGE_OBJECT_LOADING":
      return {
        ...state,
        [action.key]: { isLoading: true },
      };
    default:
      return state;
  }
}

export { pages };
