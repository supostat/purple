import { handleActions, combineActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../actions';

const initialState = [];
export default handleActions(
  {
    [combineActions(types.PAGE_DATA_SUCCESS, types.LOAD_MORE_SUCCESS)]: (state, action) => {
      const invitedUsers = oFetch(action, 'payload.invitedUsers');
      return invitedUsers;
    },
    [types.CREATE_INVITE_SUCCESS]: (state, action) => {
      const invitedUsers = oFetch(action, 'payload.invitedUsers');
      return invitedUsers;
    },
  },
  initialState,
);
