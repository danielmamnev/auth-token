import { AUTH_USER } from '../types';

export default (state = { user: null }, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.payload,
      };
  }
  return state;
};
