import { createSelector } from 'reselect';
import oFetch from 'o-fetch';

export const authUserSelector = state => oFetch(state, 'global.authUser');

export const getAuthUser = createSelector([authUserSelector], authUser => {
  const [firstName, surname] = oFetch(authUser, 'firstName', 'surname');

  return {
    ...authUser,
    fullName: `${firstName} ${surname}`,
  };
});

export default {
  getAuthUser,
};
