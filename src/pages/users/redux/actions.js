import { RSAA } from 'redux-api-middleware';
import oFetch from 'o-fetch';
import { Actions as FarceActions } from 'farce';
import { ApiService, RoutesService, setNullAsUndefined, queryStringOrNull } from '~/utils';
import { getInitialFilterData, getPaginationData } from './selectors';

export const PAGE_DATA_REQUEST = '@@users/PAGE_DATA_REQUEST';
export const PAGE_DATA_SUCCESS = '@@users/PAGE_DATA_SUCCESS';
export const PAGE_DATA_FAILURE = '@@users/PAGE_DATA_FAILURE';

export const LOAD_MORE_REQUEST = '@@users/LOAD_MORE_REQUEST';
export const LOAD_MORE_SUCCESS = '@@users/LOAD_MORE_SUCCESS';
export const LOAD_MORE_FAILURE = '@@users/LOAD_MORE_FAILURE';

export const getUsersPageData = ({ params, context }) => {
  const indexData = oFetch(ApiService, 'usersPage.indexData');
  return context.store.dispatch({
    [RSAA]: {
      endpoint: indexData.getPath(),
      method: indexData.method,
      types: [PAGE_DATA_REQUEST, PAGE_DATA_SUCCESS, PAGE_DATA_FAILURE],
    },
  });
};

export const loadMoreUsersAction = () => async (dispatch, getState) => {
  const next = oFetch(getPaginationData(getState()), 'next');
  const indexData = oFetch(ApiService, 'usersPage.indexData');
  const queryObject = getInitialFilterData(getState());
  const usersUrl = `${RoutesService.usersPage()}${queryStringOrNull({
    page: next,
    ...queryObject,
  })}`;
  window.history.pushState(null, 'title', usersUrl);
  await dispatch({
    [RSAA]: {
      endpoint: indexData.getPath(),
      method: indexData.method,
      types: [LOAD_MORE_REQUEST, LOAD_MORE_SUCCESS, LOAD_MORE_FAILURE],
    },
  });
};

export const filterUsersAction = params => (dispatch, getState) => {
  const page = oFetch(getPaginationData(getState()), 'page');
  return dispatch(
    FarceActions.push({ pathname: RoutesService.usersPage(), query: { page, ...setNullAsUndefined(params) } }),
  );
};
