import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reducer from './reducer';

export default combineReducers({
  auth: authReducer,
  data: reducer,
  selected: reducer,
  access_token: authReducer,
});
