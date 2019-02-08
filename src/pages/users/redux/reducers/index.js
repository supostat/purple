import { combineReducers } from 'redux';
import usersReducer from './users-reducer';
import uiReducer from './ui-reducer';
import paginationReducer from './pagination-reducer';

export default combineReducers({
  users: usersReducer,
  ui: uiReducer,
  pagination: paginationReducer,
});
