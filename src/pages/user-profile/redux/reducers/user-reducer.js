import { handleActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../actions';

const initialState = null;
export default handleActions(
  {
    [types.PAGE_DATA_SUCCESS]: (state, action) => {
      const user = oFetch(action, 'payload.user');
      return user;
    },
  },
  initialState,
);
