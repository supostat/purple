import { RSAA } from 'redux-api-middleware';
import oFetch from 'o-fetch';
import { Actions as FarceActions } from 'farce';
import ApiService from '~/utils/api-service';
import AuthService from '~/utils/auth-service';

export const ACCEPT_INVITE_REQUEST = '@@accept-invite/ACCEPT_INVITE_REQUEST';
export const ACCEPT_INVITE_SUCCESS = '@@accept-invite/ACCEPT_INVITE_SUCCESS';
export const ACCEPT_INVITE_FAILURE = '@@accept-invite/ACCEPT_INVITE_FAILURE';

export const PAGE_DATA_REQUEST = '@@accept-invite/PAGE_DATA_REQUEST';
export const PAGE_DATA_SUCCESS = '@@accept-invite/PAGE_DATA_SUCCESS';
export const PAGE_DATA_FAILURE = '@@accept-invite/PAGE_DATA_FAILURE';

export const getAcceptInvintationPageData = ({ params, context }) => {
  const invitationToken = oFetch(params, 'invitationToken');
  const { acceptInvitePageDataParams } = ApiService;
  return context.store.dispatch({
    [RSAA]: {
      endpoint: acceptInvitePageDataParams.getPath(invitationToken),
      method: acceptInvitePageDataParams.method,
      types: [PAGE_DATA_REQUEST, PAGE_DATA_SUCCESS, PAGE_DATA_FAILURE],
    },
  });
};

export const acceptInvintation = ({ password, passwordConfirmation, authCode, invitationToken }) => async (
  dispatch,
  getState,
) => {
  const { acceptInviteParams } = ApiService;
  const acceptInvintaionResponse = await dispatch({
    [RSAA]: {
      endpoint: acceptInviteParams.getPath(),
      method: acceptInviteParams.method,
      fetch: async (...args) => {
        const res = await fetch(...args);
        const headerAuthData = res.headers.get('Authorization');
        if (headerAuthData) {
          const [type, jwtToken] = headerAuthData.split(' ');
          AuthService.setJwtToken(jwtToken);
        }
        return res;
      },
      body: { password, passwordConfirmation, authCode, invitationToken },
      types: [ACCEPT_INVITE_REQUEST, ACCEPT_INVITE_SUCCESS, ACCEPT_INVITE_FAILURE],
    },
  });
  if (!acceptInvintaionResponse.error) {
    dispatch(FarceActions.push('/users'));
  }
  return acceptInvintaionResponse;
};
