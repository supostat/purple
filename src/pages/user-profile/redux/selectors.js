import { createSelector } from 'reselect';
import oFetch from 'o-fetch';

export const userSelector = state => oFetch(state, 'userProfilePage.user');
export const rolesSelector = state => oFetch(state, 'userProfilePage.ui.roles');
export const venuesSelector = state => oFetch(state, 'userProfilePage.ui.venues');
export const historySelector = state => oFetch(state, 'userProfilePage.history');

export const userVenuesSelector = createSelector([userSelector, venuesSelector], (user, venues) => {
  const userVenuesIds = oFetch(user, 'venuesIds');
  const userVenues = venues.filter(venue => userVenuesIds.includes(oFetch(venue, 'id')));
  return userVenues.length === 0 ? 'N/A' : venues.join(', ');
});

export const getUser = createSelector([userSelector, rolesSelector, userVenuesSelector], (user, roles, userVenues) => {
  return {
    ...user,
    fullName: `${oFetch(user, 'firstName')} ${oFetch(user, 'surname')}`,
    roleTitle: roles[oFetch(user, 'role')],
    venues: userVenues,
  };
});
