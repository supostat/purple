import { createSelector } from 'reselect';
import oFetch from 'o-fetch';

export const MANAGER_ROLE = 'manager';
export const ADMIN_ROLE = 'admin';

export const ROLES_TITLES = {
  [MANAGER_ROLE]: 'Manager',
  [ADMIN_ROLE]: 'Admin',
};

export const authUserSelector = state => oFetch(state, 'global.authUser');
export const menuSelector = state => oFetch(state, 'global.menu');

export const getAuthUser = createSelector([authUserSelector], authUser => {
  if (!authUser) return null;
  const [firstName, surname, role] = oFetch(authUser, 'firstName', 'surname', 'role');

  return {
    ...authUser,
    fullName: `${firstName} ${surname}`,
    roleTitle: ROLES_TITLES[role],
  };
});

export const getQuickMenu = createSelector([getAuthUser], authUser => {
  if (!authUser) {
    return {};
  }
});

export default {
  getAuthUser,
};
