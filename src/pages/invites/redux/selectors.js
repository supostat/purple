import { createSelector } from 'reselect';
import oFetch from 'o-fetch';
import { DateFormats, getValueLabelArrayFromObject, getArrayOfNumbersFromStringOrArray } from '~/utils';
import { iso8601Parse } from '~/utils/safe-moment';

export const invitedUsersSelector = state => oFetch(state, 'invitesPage.invitedUsers');
export const venuesSelector = state => oFetch(state, 'invitesPage.ui.venues');
export const rolesSelector = state => oFetch(state, 'invitesPage.ui.roles');
export const foundSelector = state => oFetch(state, 'found');
export const paginationSelector = state => oFetch(state, 'invitesPage.pagination');
export const invitationStatusesSelector = state => oFetch(state, 'invitesPage.ui.invitationStatuses');

export const getRolesOptions = createSelector(rolesSelector, roles => {
  return getValueLabelArrayFromObject(roles);
});

export const getStatusesOptions = createSelector(invitationStatusesSelector, statuses => {
  return getValueLabelArrayFromObject(statuses);
});

export const getInitialFilterData = createSelector(foundSelector, found => {
  const query = oFetch(found, 'match.location.query');
  const { venues, email, status, role } = query;
  return {
    venues: getArrayOfNumbersFromStringOrArray(venues),
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

export const getInvitedUsers = createSelector(
  [invitedUsersSelector, venuesSelector, rolesSelector, invitationStatusesSelector],
  (invitedUsers, venues, roles, invitationStatuses) => {
    return invitedUsers.map(invitedUser => {
      const invitedUserVenuesIds = oFetch(invitedUser, 'venuesIds');
      const invitedUserVenues = venues.filter(venue => invitedUserVenuesIds.includes(oFetch(venue, 'id')));
      return {
        ...invitedUser,
        inviterFullName: oFetch(invitedUser, 'inviterFullName') || 'N/A',
        invitedAtFormatted: iso8601Parse(oFetch(invitedUser, 'invitedAt')).format(DateFormats.withShortWeek),
        roleTitle: roles[oFetch(invitedUser, 'role')],
        invitationStatusTitle: invitationStatuses[oFetch(invitedUser, 'invitationStatus')],
        venues:
          invitedUserVenues.length === 0 ? 'N/A' : invitedUserVenues.map(venue => oFetch(venue, 'name')).join(', '),
      };
    });
  },
);
