import { combineReducers } from 'redux';
import authUser from './auth-user-reducer';
import menu from './menu-reducer';

export default combineReducers({
  authUser,
  menu,
});
