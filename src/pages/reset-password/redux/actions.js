import { RSAA } from 'redux-api-middleware';
import oFetch from 'o-fetch';
import { createAction } from 'redux-actions';
import { Actions as FarceActions } from 'farce';
import { ApiService, RoutesService } from '~/utils';

export const HIDE_SUCCESS_PAGE = '@@reset_password/HIDE_SUCCESS_PAGE';

export const RESET_PASSWORD_REQUEST = '@@reset_password/RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = '@@reset_password/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = '@@reset_password/RESET_PASSWORD_FAILURE';

export const hideSuccessPage = createAction(HIDE_SUCCESS_PAGE);

export const resetPasswordAction = params => async dispatch => {
  const resetPassword = oFetch(ApiService, 'resetPasswordPage.resetPassword');
  const response = await dispatch({
    [RSAA]: {
      endpoint: resetPassword.getPath(),
      method: resetPassword.method,
      body: params,
      types: [RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
    },
  });
  return response;
};

export const goBackAction = () => dispatch => {
  dispatch(FarceActions.push(RoutesService.loginPage()));
  dispatch(hideSuccessPage());
};
