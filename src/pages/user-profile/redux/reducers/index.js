import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import uiReducer from './ui-reducer';
import userHistoryReducer from './history-reducer';

export default combineReducers({
  user: userReducer,
  ui: uiReducer,
  userHistory: userHistoryReducer,
});
