import { handleActions, combineActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../actions';

const initialState = {
  roles: [],
  venues: [],
  invitationStatuses: {},
};
export default handleActions(
  {
    [types.PAGE_DATA_SUCCESS]: (state, action) => {
      const [roles, venues, invitationStatuses] = oFetch(
        action,
        'payload.roles',
        'payload.venues',
        'payload.invitationStatuses',
      );
      return {
        ...state,
        roles,
        venues,
        invitationStatuses,
      };
    },
  },
  initialState,
);
