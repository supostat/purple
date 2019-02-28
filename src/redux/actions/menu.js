import { RSAA } from 'redux-api-middleware';
import { ApiService } from '~/utils';

export const MENU_REQUEST = '@@menu/MENU_REQUEST';
export const MENU_SUCCESS = '@@menu/MENU_SUCCESS';
export const MENU_FAILURE = '@@menu/MENU_FAILURE';

export const getMenuAction = () => dispatch => {
  const { menu } = ApiService;

  return dispatch({
    [RSAA]: {
      endpoint: menu.getPath(),
      method: menu.method,
      types: [MENU_REQUEST, MENU_SUCCESS, MENU_FAILURE],
    },
  });
};
