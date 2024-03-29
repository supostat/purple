import { handleActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../actions';

const initialState = {
  showAlmostDone: false,
};
export default handleActions(
  {
    [types.EMAIL_LINK_SUCCESS]: state => {
      return {
        ...state,
        showAlmostDone: true,
      };
    },
    [types.HIDE_ALMOST_DONE_PAGE]: state => {
      return {
        ...state,
        showAlmostDone: false,
      };
    },
  },
  initialState,
);
