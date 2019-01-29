import { combineReducers } from 'redux';
import invitedUsersReducer from './invited-users-reducer';
import uiReducer from './ui-reducer';
import paginationReducer from './pagination-reducer';

export default combineReducers({
  invitedUsers: invitedUsersReducer,
  ui: uiReducer,
  pagination: paginationReducer,
});
