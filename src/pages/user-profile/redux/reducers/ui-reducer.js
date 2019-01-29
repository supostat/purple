import { handleActions, combineActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../actions';

const initialState = {
  roles: [],
  venues: [],
  isHistoryFetching: false,
};
export default handleActions(
  {
    [types.PAGE_DATA_SUCCESS]: (state, action) => {
      const [roles, venues] = oFetch(action, 'payload.roles', 'payload.venues');
      return {
        ...state,
        roles,
        venues,
      };
    },
    [types.USER_HISTORY_REQUEST]: state => {
      return {
        ...state,
        isHistoryFetching: true,
      };
    },
    [combineActions(types.USER_HISTORY_SUCCESS, types.USER_HISTORY_FAILURE)]: state => {
      return {
        ...state,
        isHistoryFetching: false,
      };
    },
  },
  initialState,
);
