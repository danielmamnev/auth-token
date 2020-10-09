export default (state = { contacts: null }, action) => {
  switch (action.type) {
    case 'LOAD_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
      };
    default:
  }
  return state;
};
