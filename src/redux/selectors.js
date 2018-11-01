import { createSelector } from 'reselect';
import oFetch from 'o-fetch';

export const getAuthUser = state => oFetch(state, 'rootReducer.authUser');

export default {
  getAuthUser,
};
