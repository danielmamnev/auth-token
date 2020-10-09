export default (state = { contacts: null }, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        contacts: action.payload,
      };
    default:
  }
  return state;
};
