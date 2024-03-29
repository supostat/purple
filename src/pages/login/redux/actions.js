import { RSAA } from 'redux-api-middleware';
import { Actions as FarceActions } from 'farce';
import oFetch from 'o-fetch';
import AuthService from '~/utils/auth-service';
import ApiService from '~/utils/api-service';

export const USER_LOGIN_REQUEST = '@@login/USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = '@@login/USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = '@@login/USER_LOGIN_FAILURE';

export const userLogin = ({ email, password, authCode }) => async (dispatch, getState) => {
  const { loginParams } = ApiService;
  const loginResponse = await dispatch({
    [RSAA]: {
      endpoint: loginParams.getPath(),
      method: loginParams.method,
      fetch: async (...args) => {
        const res = await fetch(...args);
        const headerAuthData = res.headers.get('Authorization');
        if (headerAuthData) {
          const [type, jwtToken] = headerAuthData.split(' ');
          AuthService.setJwtToken(jwtToken);
        }
        return res;
      },
      body: { user: { email, password, otp_attempt: authCode } },
      types: [USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE],
    },
  });
  if (!loginResponse.error) {
    const pathName = oFetch(getState(), 'found.resolvedMatch.location.pathname');
    dispatch(FarceActions.push(pathName || '/users'));
  }
  return loginResponse;
};
