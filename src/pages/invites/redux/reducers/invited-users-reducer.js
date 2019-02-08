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
    [types.REVOKE_INVITE_SUCCESS]: (state, action) => {
      const revokedInvited = oFetch(action, 'payload.invitedUser');
      const revokedInvitedId = oFetch(revokedInvited, 'id');
      return state.map(invited => {
        const invitedId = oFetch(invited, 'id');
        if (invitedId === revokedInvitedId) {
          return revokedInvited;
        }
        return invited;
      });
    },
  },
  initialState,
);
