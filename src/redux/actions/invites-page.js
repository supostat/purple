import { RSAA } from 'redux-api-middleware';
import ApiService from '~/utils/api-service';

export const PAGE_DATA_REQUEST = '@@invites/PAGE_DATA_REQUEST';
export const PAGE_DATA_SUCCESS = '@@invites/PAGE_DATA_SUCCESS';
export const PAGE_DATA_FAILURE = '@@invites/PAGE_DATA_FAILURE';

export const getInvitesPageData = ({ params, context }) =>
  context.store.dispatch({
    [RSAA]: {
      endpoint: ApiService.invitesPageDataApiUrl,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [PAGE_DATA_REQUEST, PAGE_DATA_SUCCESS, PAGE_DATA_FAILURE],
    },
  });
