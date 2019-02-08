import { handleActions, combineActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../actions';

const initialState = {
  page: 1,
  next: null,
  showing: null,
  count: null,
};

export default handleActions(
  {
    [combineActions(types.PAGE_DATA_SUCCESS, types.LOAD_MORE_SUCCESS)]: (state, action) => {
      const pagination = oFetch(action, 'payload.pagination');
      return pagination;
    },
  },
  initialState,
);
