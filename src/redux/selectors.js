import { createSelector } from 'reselect';
import oFetch from 'o-fetch';
import humanizeString from 'humanize-string';

export const authUserSelector = state => oFetch(state, 'global.authUser');

export const getAuthUser = createSelector([authUserSelector], authUser => {
  if (!authUser) return null;
  const [firstName, surname, role] = oFetch(authUser, 'firstName', 'surname', 'role');

  return {
    ...authUser,
    fullName: `${firstName} ${surname}`,
    roleTitle: humanizeString(role),
  };
});

export default {
  getAuthUser,
};
