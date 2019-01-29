import { RSAA } from 'redux-api-middleware';
import ApiService from '~/utils/api-service';

export const PAGE_DATA_REQUEST = '@@users/PAGE_DATA_REQUEST';
export const PAGE_DATA_SUCCESS = '@@users/PAGE_DATA_SUCCESS';
export const PAGE_DATA_FAILURE = '@@users/PAGE_DATA_FAILURE';

export const getUsersPageData = ({ params, context }) => {
  const { usersPageDataParams } = ApiService;
  return context.store.dispatch({
    [RSAA]: {
      endpoint: usersPageDataParams.getPath(),
      method: usersPageDataParams.method,
      types: [PAGE_DATA_REQUEST, PAGE_DATA_SUCCESS, PAGE_DATA_FAILURE],
    },
  });
};
