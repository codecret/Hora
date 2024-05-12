const reducer = (state, action) => {
  if (action.type === "HANDLE_CHANGE") {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
