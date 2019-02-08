import { createSelector } from 'reselect';
import oFetch from 'o-fetch';
import { getValueLabelArrayFromObject } from '~/utils';

export const usersSelector = state => oFetch(state, 'usersPage.users');
export const rolesSelector = state => oFetch(state, 'usersPage.ui.roles');
export const statusesSelector = state => oFetch(state, 'usersPage.ui.statuses');
export const foundSelector = state => oFetch(state, 'found');
export const paginationSelector = state => oFetch(state, 'usersPage.pagination');

export const getInitialFilterData = createSelector(foundSelector, found => {
  const query = oFetch(found, 'match.location.query');
  const { name, email, status, role } = query;
  return {
    name: name || null,
    email: email || null,
    status: status || null,
    role: role || null,
  };
});

export const getPaginationData = createSelector(paginationSelector, pagination => {
  const next = oFetch(pagination, 'next');
  return {
    ...pagination,
    showLoadMore: !!next,
  };
});

export const getRolesOptions = createSelector(rolesSelector, roles => {
  return getValueLabelArrayFromObject(roles);
});

export const getStatusesOptions = createSelector(statusesSelector, statuses => {
  return getValueLabelArrayFromObject(statuses);
});

export const getUsers = createSelector([usersSelector], users => {
  return users.map(user => {
    return {
      ...user,
      fullName: `${oFetch(user, 'firstName')} ${oFetch(user, 'surname')}`,
    };
  });
});
