import { handleActions, combineActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../actions';

const initialState = null;
export default handleActions(
  {
    [types.PAGE_DATA_SUCCESS]: (state, action) => {
      const user = oFetch(action, 'payload.user');
      return user;
    },
    [combineActions(
      types.ENABLE_USER_SUCCESS,
      types.DISABLE_USER_SUCCESS,
      types.UPDATE_ACCESS_DETAILS_SUCCESS,
      types.UPDATE_PERSONAL_DETAILS_SUCCESS,
    )]: (state, action) => {
      const user = oFetch(action, 'payload.user');
      return user;
    },
  },
  initialState,
);
