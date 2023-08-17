const AddedList = {};

function actionAddedList(state = AddedList, action) {
  switch (action.type) {
    case "ADDED_ACTION_LIST":
      return {
        ...state,
        [action.key]: action.payload,
      };
    case "ADDED_ACTION_LIST_LOADING":
      return {
        ...state,
        [action.key]: { isLoading: true },
      };
    default:
      return state;
  }
}
const NewList = {};
function actionNewList(state = NewList, action) {
  switch (action.type) {
    case "NEW_ACTION_LIST":
      return {
        ...state,
        [action.key]: action.payload,
      };
    case "NEW_ACTION_LIST_LOADING":
      return {
        ...state,
        [action.key]: { isLoading: true },
      };
    default:
      return state;
  }
}
export { actionAddedList, actionNewList };
