import { createSelector } from 'reselect';
import oFetch from 'o-fetch';

export const usersSelector = state => oFetch(state, 'usersPage.users');

export const getUsers = createSelector([usersSelector], users => {
  return users.map(user => {
    return {
      ...user,
      fullName: `${oFetch(user, 'firstName')} ${oFetch(user, 'surname')}`,
    };
  });
});

export const getUsersCount = createSelector([getUsers], users => {
  return users.length;
});
