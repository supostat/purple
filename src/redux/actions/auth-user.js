import jwtDecode from 'jwt-decode';
import { RSAA } from 'redux-api-middleware';
import { Actions as FarceActions } from 'farce';
import { createAction } from 'redux-actions';
import { AuthService, ApiService } from '~/utils';
import * as types from '../types';

export const USER_LOGOUT_REQUEST = '@@login/USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = '@@login/USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = '@@login/USER_LOGOUT_FAILURE';

export const setAuthUserAction = createAction(types.SET_AUTH_USER);

export const setAuthUserFromJwt = ({ params, context }) => {
  const jwtToken = AuthService.getJwtToken();
  if (jwtToken) {
    const userData = jwtDecode(jwtToken);
    return context.store.dispatch(setAuthUserAction(userData));
  }
  return null;
};

export const userLogout = () => async (dispatch, getState) => {
  const logoutResponse = await dispatch({
    [RSAA]: {
      endpoint: ApiService.logoutApiUrl,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      types: [USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAILURE],
    },
  });
  if (!logoutResponse.error) {
    AuthService.clearJwtToken();
    dispatch(FarceActions.push('/'));
  }
  return logoutResponse;
};
