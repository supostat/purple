import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import uiReducer from './ui-reducer';

export default combineReducers({
  user: userReducer,
  ui: uiReducer,
});
