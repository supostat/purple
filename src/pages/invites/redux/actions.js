import { RSAA } from 'redux-api-middleware';
import oFetch from 'o-fetch';
import { Actions as FarceActions } from 'farce';
import { ApiService, setNullAsUndefined } from '~/utils';
import { getPaginationData, getInitialFilterData } from './selectors';

export const PAGE_DATA_REQUEST = '@@invites/PAGE_DATA_REQUEST';
export const PAGE_DATA_SUCCESS = '@@invites/PAGE_DATA_SUCCESS';
export const PAGE_DATA_FAILURE = '@@invites/PAGE_DATA_FAILURE';

export const CREATE_INVITE_REQUEST = '@@invites/CREATE_INVITE_REQUEST';
export const CREATE_INVITE_SUCCESS = '@@invites/CREATE_INVITE_SUCCESS';
export const CREATE_INVITE_FAILURE = '@@invites/CREATE_INVITE_FAILURE';

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

export const loadMoreInvitedAction = () => (dispatch, getState) => {
  const next = oFetch(getPaginationData(getState()), 'next');
  const queryObject = getInitialFilterData(getState());
  return dispatch(
    FarceActions.replace({ pathname: '/invites', query: { page: next, ...setNullAsUndefined(queryObject) } }),
  );
};

export const createInviteAction = params => dispatch => {
  const createInvite = oFetch(ApiService, 'invitesPage.createInvite');

  return dispatch({
    [RSAA]: {
      endpoint: createInvite.getPath(),
      method: createInvite.method,
      body: params,
      types: [CREATE_INVITE_REQUEST, CREATE_INVITE_SUCCESS, CREATE_INVITE_FAILURE],
    },
  });
};

export const filterInvitesAction = params => (dispatch, getState) => {
  const page = oFetch(getPaginationData(getState()), 'page');
  return dispatch(FarceActions.push({ pathname: '/invites', query: { page, ...setNullAsUndefined(params) } }));
};
