import { handleActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../actions';

const initialState = [];
export default handleActions(
  {
    [types.PAGE_DATA_SUCCESS]: (state, action) => {
      const invitedUsers = oFetch(action, 'payload.invitedUsers');
      return invitedUsers;
    },
  },
  initialState,
);
