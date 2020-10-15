export default (state = { contacts: null, selected: [] }, action) => {
  switch (action.type) {
    case 'LOAD_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
      };
    case 'LOAD_SELECTED':
      return {
        ...state,
        selected: action.payload,
      };
    default:
  }
  return state;
};
