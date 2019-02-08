import { RSAA } from 'redux-api-middleware';
import oFetch from 'o-fetch';
import { ApiService, RoutesService, setNullAsUndefined, queryStringOrNull } from '~/utils';

export const PAGE_DATA_REQUEST = '@@user_profile/PAGE_DATA_REQUEST';
export const PAGE_DATA_SUCCESS = '@@user_profile/PAGE_DATA_SUCCESS';
export const PAGE_DATA_FAILURE = '@@user_profile/PAGE_DATA_FAILURE';

export const USER_HISTORY_REQUEST = '@@user_profile/USER_HISTORY_REQUEST';
export const USER_HISTORY_SUCCESS = '@@user_profile/USER_HISTORY_SUCCESS';
export const USER_HISTORY_FAILURE = '@@user_profile/USER_HISTORY_FAILURE';

export const UPDATE_PERSONAL_DETAILS_REQUEST = '@@user_profile/UPDATE_PERSONAL_DETAILS_REQUEST';
export const UPDATE_PERSONAL_DETAILS_SUCCESS = '@@user_profile/UPDATE_PERSONAL_DETAILS_SUCCESS';
export const UPDATE_PERSONAL_DETAILS_FAILURE = '@@user_profile/UPDATE_PERSONAL_DETAILS_FAILURE';

export const UPDATE_ACCESS_DETAILS_REQUEST = '@@user_profile/UPDATE_ACCESS_DETAILS_REQUEST';
export const UPDATE_ACCESS_DETAILS_SUCCESS = '@@user_profile/UPDATE_ACCESS_DETAILS_SUCCESS';
export const UPDATE_ACCESS_DETAILS_FAILURE = '@@user_profile/UPDATE_ACCESS_DETAILS_FAILURE';

export const DISABLE_USER_REQUEST = '@@user_profile/DISABLE_USER_REQUEST';
export const DISABLE_USER_SUCCESS = '@@user_profile/DISABLE_USER_SUCCESS';
export const DISABLE_USER_FAILURE = '@@user_profile/DISABLE_USER_FAILURE';

export const ENABLE_USER_REQUEST = '@@user_profile/ENABLE_USER_REQUEST';
export const ENABLE_USER_SUCCESS = '@@user_profile/ENABLE_USER_SUCCESS';
export const ENABLE_USER_FAILURE = '@@user_profile/ENABLE_USER_FAILURE';

export const getUserProfilePageData = ({ params, context }) => {
  const { id } = params;
  const userProfile = oFetch(ApiService, 'userProfilePage.userProfile');
  return context.store.dispatch({
    [RSAA]: {
      endpoint: userProfile.getPath(id),
      method: userProfile.method,
      types: [PAGE_DATA_REQUEST, PAGE_DATA_SUCCESS, PAGE_DATA_FAILURE],
    },
  });
};

export const updatePersonalDetailsAction = ({ id, ...params }) => dispatch => {
  const updatePersonalDetails = oFetch(ApiService, 'userProfilePage.updatePersonalDetails');
  return dispatch({
    [RSAA]: {
      endpoint: updatePersonalDetails.getPath(id),
      method: updatePersonalDetails.method,
      body: params,
      types: [
        UPDATE_PERSONAL_DETAILS_REQUEST,
        { type: UPDATE_PERSONAL_DETAILS_SUCCESS, meta: { message: 'Personal details updated successfully!' } },
        { type: UPDATE_PERSONAL_DETAILS_FAILURE, meta: { message: 'Personal details updated failed!' } },
      ],
    },
  });
};

export const updateAccessDetailsAction = ({ id, ...params }) => dispatch => {
  const updateAccessDetails = oFetch(ApiService, 'userProfilePage.updateAccessDetails');
  return dispatch({
    [RSAA]: {
      endpoint: updateAccessDetails.getPath(id),
      method: updateAccessDetails.method,
      body: params,
      types: [
        UPDATE_ACCESS_DETAILS_REQUEST,
        { type: UPDATE_ACCESS_DETAILS_SUCCESS, meta: { message: 'Access details updated successfully!' } },
        { type: UPDATE_ACCESS_DETAILS_FAILURE, meta: { message: 'Access details updated failed!' } },
      ],
    },
  });
};

export const disableUserAction = ({ id, ...params }) => dispatch => {
  const disableUser = oFetch(ApiService, 'userProfilePage.disableUser');
  return dispatch({
    [RSAA]: {
      endpoint: disableUser.getPath(id),
      method: disableUser.method,
      body: params,
      types: [
        DISABLE_USER_REQUEST,
        { type: DISABLE_USER_SUCCESS, meta: { message: 'User disabled successfully!' } },
        { type: DISABLE_USER_FAILURE, meta: { message: 'User disable failed!' } },
      ],
    },
  });
};

export const enableUserAction = userId => dispatch => {
  const enableUser = oFetch(ApiService, 'userProfilePage.enableUser');
  return dispatch({
    [RSAA]: {
      endpoint: enableUser.getPath(userId),
      method: enableUser.method,
      types: [
        ENABLE_USER_REQUEST,
        { type: ENABLE_USER_SUCCESS, meta: { message: 'User enabled successfully!' } },
        { type: ENABLE_USER_FAILURE, meta: { message: 'User enable failed!' } },
      ],
    },
  });
};

export const getUserHistoryAction = userId => dispatch => {
  const getUserHistory = oFetch(ApiService, 'userProfilePage.getUserHistory');
  return dispatch({
    [RSAA]: {
      endpoint: getUserHistory.getPath(userId),
      method: getUserHistory.method,
      types: [USER_HISTORY_REQUEST, USER_HISTORY_SUCCESS, USER_HISTORY_FAILURE],
    },
  });
};

export const filterUserHistoryAction = ({ userId, startDate, endDate }) => dispatch => {
  const userProfileUrl = `${RoutesService.userProfileUrl(userId)}${queryStringOrNull({
    start_date: startDate,
    end_date: endDate,
  })}`;
  window.history.pushState(null, 'title', userProfileUrl);
  const getUserHistory = oFetch(ApiService, 'userProfilePage.getUserHistory');
  return dispatch({
    [RSAA]: {
      endpoint: getUserHistory.getPath(userId),
      method: getUserHistory.method,
      types: [USER_HISTORY_REQUEST, USER_HISTORY_SUCCESS, USER_HISTORY_FAILURE],
    },
  });
};
