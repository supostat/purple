import { handleActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../actions';

const initialState = {
  showSuccess: false,
};
export default handleActions(
  {
    [types.RESET_PASSWORD_SUCCESS]: state => {
      return {
        ...state,
        showSuccess: true,
      };
    },
    [types.HIDE_SUCCESS_PAGE]: state => {
      return {
        ...state,
        showSuccess: false,
      };
    },
  },
  initialState,
);
