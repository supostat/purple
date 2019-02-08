import { handleActions, combineActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../actions';

const initialState = {
  roles: [],
  venues: [],
  statuses: [],
};

export default handleActions(
  {
    [combineActions(types.PAGE_DATA_SUCCESS)]: (state, action) => {
      const [roles, venues, statuses] = oFetch(action, 'payload.roles', 'payload.venues', 'payload.statuses');
      return {
        ...state,
        roles,
        venues,
        statuses,
      };
    },
  },
  initialState,
);
