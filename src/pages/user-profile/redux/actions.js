import { RSAA } from 'redux-api-middleware';
import ApiService from '~/utils/api-service';

export const PAGE_DATA_REQUEST = '@@user_profile/PAGE_DATA_REQUEST';
export const PAGE_DATA_SUCCESS = '@@user_profile/PAGE_DATA_SUCCESS';
export const PAGE_DATA_FAILURE = '@@user_profile/PAGE_DATA_FAILURE';

export const USER_HISTORY_REQUEST = '@@user_profile/USER_HISTORY_REQUEST';
export const USER_HISTORY_SUCCESS = '@@user_profile/USER_HISTORY_SUCCESS';
export const USER_HISTORY_FAILURE = '@@user_profile/USER_HISTORY_FAILURE';

export const getUserProfilePageData = ({ params, context }) => {
  const { id } = params;
  const { userProfilePageDataParams } = ApiService;
  return context.store.dispatch({
    [RSAA]: {
      endpoint: userProfilePageDataParams.getPath(id),
      method: userProfilePageDataParams.method,
      types: [PAGE_DATA_REQUEST, PAGE_DATA_SUCCESS, PAGE_DATA_FAILURE],
    },
  });
};

export const getUserHistory = userId => dispatch => {
  const { userProfileHistoryParams } = ApiService;
  return dispatch({
    [RSAA]: {
      endpoint: userProfileHistoryParams.getPath(userId),
      method: userProfileHistoryParams.method,
      types: [USER_HISTORY_REQUEST, USER_HISTORY_SUCCESS, USER_HISTORY_FAILURE],
    },
  });
};
