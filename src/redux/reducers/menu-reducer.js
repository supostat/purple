import { handleActions } from 'redux-actions';
import oFetch from 'o-fetch';

import * as types from '../actions/menu';

const initialState = null;
export default handleActions(
  {
    [types.MENU_SUCCESS]: (state, action) => {
      const menu = oFetch(action, 'payload.menu');
      return menu;
    },
  },
  initialState,
);
