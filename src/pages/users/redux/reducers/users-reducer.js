import { handleActions, combineActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../actions';

const initialState = [];
export default handleActions(
  {
    [combineActions(types.PAGE_DATA_SUCCESS, types.LOAD_MORE_SUCCESS)]: (state, action) => {
      const users = oFetch(action, 'payload.users');
      return users;
    },
  },
  initialState,
);
