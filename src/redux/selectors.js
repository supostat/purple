import { createSelector } from 'reselect';
import oFetch from 'o-fetch';

export const getAuthUser = state => oFetch(state, 'global.authUser');

export default {
  getAuthUser,
};
