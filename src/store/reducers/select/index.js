const initialState = {};
  
  function select(state = initialState, action) {
    switch (action.type) {
        case 'ADD_SELECT_OBJECT':
            return {
                ...state,
                [action.api]:action.payload
            };
        default:
            return state;
    }
}

export { select };

  