import { handleActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../types';

const initialState = null;
export default handleActions(
  {
    [types.SET_AUTH_USER]: (state, action) => {
      const user = oFetch(action, 'payload');
      return user;
    },
  },
  initialState,
);
