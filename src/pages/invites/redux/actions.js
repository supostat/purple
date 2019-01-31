import { RSAA } from 'redux-api-middleware';
import oFetch from 'o-fetch';
import qs from 'query-string';
import { Actions as FarceActions } from 'farce';
import { ApiService, setNullAsUndefined } from '~/utils';
import { getPaginationData, getInitialFilterData } from './selectors';

export const PAGE_DATA_REQUEST = '@@invites/PAGE_DATA_REQUEST';
export const PAGE_DATA_SUCCESS = '@@invites/PAGE_DATA_SUCCESS';
export const PAGE_DATA_FAILURE = '@@invites/PAGE_DATA_FAILURE';

export const CREATE_INVITE_REQUEST = '@@invites/CREATE_INVITE_REQUEST';
export const CREATE_INVITE_SUCCESS = '@@invites/CREATE_INVITE_SUCCESS';
export const CREATE_INVITE_FAILURE = '@@invites/CREATE_INVITE_FAILURE';

export const REVOKE_INVITE_REQUEST = '@@invites/REVOKE_INVITE_REQUEST';
export const REVOKE_INVITE_SUCCESS = '@@invites/REVOKE_INVITE_SUCCESS';
export const REVOKE_INVITE_FAILURE = '@@invites/REVOKE_INVITE_FAILURE';

export const LOAD_MORE_REQUEST = '@@invites/LOAD_MORE_REQUEST';
export const LOAD_MORE_SUCCESS = '@@invites/LOAD_MORE_SUCCESS';
export const LOAD_MORE_FAILURE = '@@invites/LOAD_MORE_FAILURE';

export const getInvitesPageData = ({ params, context }) => {
  const indexData = oFetch(ApiService, 'invitesPage.indexData');
  return context.store.dispatch({
    [RSAA]: {
      endpoint: indexData.getPath(),
      method: indexData.method,
      types: [PAGE_DATA_REQUEST, PAGE_DATA_SUCCESS, PAGE_DATA_FAILURE],
    },
  });
};

export const loadMoreInvitedAction = () => async (dispatch, getState) => {
  const next = oFetch(getPaginationData(getState()), 'next');
  const indexData = oFetch(ApiService, 'invitesPage.indexData');
  const queryObject = getInitialFilterData(getState());
  window.history.pushState(
    null,
    'title',
    `/invites?${qs.stringify({ page: next, ...setNullAsUndefined(queryObject) })}`,
  );
  await dispatch({
    [RSAA]: {
      endpoint: indexData.getPath(),
      method: indexData.method,
      types: [LOAD_MORE_REQUEST, LOAD_MORE_SUCCESS, LOAD_MORE_FAILURE],
    },
  });
};

export const createInviteAction = params => dispatch => {
  const createInvite = oFetch(ApiService, 'invitesPage.createInvite');

  return dispatch({
    [RSAA]: {
      endpoint: createInvite.getPath(),
      method: createInvite.method,
      body: { invitedUser: params },
      types: [
        CREATE_INVITE_REQUEST,
        {
          type: CREATE_INVITE_SUCCESS,
          meta: { message: 'Invite was created successfully!' },
        },
        {
          type: CREATE_INVITE_FAILURE,
        },
      ],
    },
  });
};

export const revokeInviteAction = invitedId => dispatch => {
  const revokeInvite = oFetch(ApiService, 'invitesPage.revokeInvite');

  return dispatch({
    [RSAA]: {
      endpoint: revokeInvite.getPath(invitedId),
      method: revokeInvite.method,
      types: [
        REVOKE_INVITE_REQUEST,
        { type: REVOKE_INVITE_SUCCESS, meta: { message: 'Invite revoked successfully!' } },
        { type: REVOKE_INVITE_FAILURE, meta: { message: 'Revoke invite failed!' } },
      ],
    },
  });
};

export const filterInvitesAction = params => (dispatch, getState) => {
  const page = oFetch(getPaginationData(getState()), 'page');
  return dispatch(FarceActions.push({ pathname: '/invites', query: { page, ...setNullAsUndefined(params) } }));
};
