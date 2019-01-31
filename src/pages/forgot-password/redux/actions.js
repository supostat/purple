import { RSAA } from 'redux-api-middleware';
import oFetch from 'o-fetch';
import { Actions as FarceActions } from 'farce';
import { ApiService } from '~/utils';

export const EMAIL_LINK_REQUEST = '@@forgot_password/EMAIL_LINK_REQUEST';
export const EMAIL_LINK_SUCCESS = '@@forgot_password/EMAIL_LINK_SUCCESS';
export const EMAIL_LINK_FAILURE = '@@forgot_password/EMAIL_LINK_FAILURE';

export const sendResetPasswordEmailLinkAction = params => async dispatch => {
  const sendResetPasswordEmail = oFetch(ApiService, 'forgotPasswordPage.sendResetPasswordEmail');
  const response = await dispatch({
    [RSAA]: {
      endpoint: sendResetPasswordEmail.getPath(),
      method: sendResetPasswordEmail.method,
      body: params,
      types: [EMAIL_LINK_REQUEST, EMAIL_LINK_SUCCESS, EMAIL_LINK_FAILURE],
    },
  });
  return response;
};
