export default (state = { user: null, access_token: null }, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'ACC_TOK':
      return {
        ...state,
        access_token: action.payload,
      };
    default:
  }
  return state;
};
