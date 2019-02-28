import { createSelector } from 'reselect';
import oFetch from 'o-fetch';
import groupBy from 'lodash/groupBy';
import { getValueLabelArrayFromObject, safeJSONParse, safeSeparate, DateFormats } from '~/utils';
import { iso8601Parse } from '~/utils/safe-moment';

export const FIRST_NAME_KEY = 'first_name';
export const SURNAME_KEY = 'surname';
export const WORK_VENUES_KEY = 'work_venues';
export const ROLE_KEY = 'role';
export const EMAIL_KEY = 'email';
export const ENABLED_KEY = 'enabled';
export const DISABLED_KEY = 'disabled';

export const HISTORY_FIELD_NAMES = {
  [FIRST_NAME_KEY]: 'First name',
  [SURNAME_KEY]: 'Surname',
  [WORK_VENUES_KEY]: 'Work venues',
  [ROLE_KEY]: 'Role',
  [EMAIL_KEY]: 'Email address',
  [ENABLED_KEY]: 'Enabled',
  [DISABLED_KEY]: 'Disabled',
};

export const userSelector = state => oFetch(state, 'userProfilePage.user');
export const rolesSelector = state => oFetch(state, 'userProfilePage.ui.roles');
export const venuesSelector = state => oFetch(state, 'userProfilePage.ui.venues');
export const historySelector = state => oFetch(state, 'userProfilePage.userHistory');
export const foundSelector = state => oFetch(state, 'found');

const getHistoryOldValue = (key, oldValue) => {
  return safeSeparate(safeJSONParse(oldValue), 'name', ', ');
};

const getHistoryNewValue = (key, newValue) => {
  return safeSeparate(safeJSONParse(newValue), 'name', ', ');
};

const getDisplayedHistoryKey = key => {
  return HISTORY_FIELD_NAMES[key];
};

const getHistoryFields = historyItem => {
  const [key, oldValue, newValue] = oFetch(historyItem, 'key', 'oldValue', 'newValue');
  return {
    displayedOldValue: getHistoryOldValue(key, oldValue),
    displayedNewValue: getHistoryNewValue(key, newValue),
    displayedKey: getDisplayedHistoryKey(key),
  };
};

export const getInitialFilterData = createSelector(foundSelector, found => {
  const query = oFetch(found, 'match.location.query');
  const { start_date, end_date } = query;
  return {
    startDate: start_date || null,
    endDate: end_date || null,
  };
});

export const getRolesOptions = createSelector(rolesSelector, roles => {
  return getValueLabelArrayFromObject(roles);
});

export const userVenuesSelector = createSelector([userSelector, venuesSelector], (user, venues) => {
  const userVenuesIds = oFetch(user, 'venuesIds');
  const userVenues = venues.filter(venue => userVenuesIds.includes(oFetch(venue, 'id')));
  return userVenues.length === 0 ? 'N/A' : userVenues.map(venue => oFetch(venue, 'name')).join(', ');
});

export const getUser = createSelector([userSelector, rolesSelector, userVenuesSelector], (user, roles, userVenues) => {
  return {
    ...user,
    fullName: `${oFetch(user, 'firstName')} ${oFetch(user, 'surname')}`,
    roleTitle: roles[oFetch(user, 'role')],
    venues: userVenues,
  };
});

export const getUserHistorySelector = createSelector(historySelector, history => {
  const grouppedHistory = groupBy(history, item => `${oFetch(item, 'updatedAt')}___${oFetch(item, 'updatedBy')}`);
  return Object.entries(grouppedHistory).reduce((acc, historyEntry) => {
    const [updatedAtWithUpdatedBy, historyItems] = historyEntry;
    const [updatedAt, updatedBy] = updatedAtWithUpdatedBy.split('___');
    const displayedUpdatedAt = iso8601Parse(updatedAt).format(DateFormats.withTimeSecondsAndShortWeek);
    const mappedHistory = historyItems.map(historyItem => {
      return {
        ...historyItem,
        ...getHistoryFields(historyItem),
      };
    });
    return {
      ...acc,
      [displayedUpdatedAt]: {
        updatedBy,
        historyItems: mappedHistory,
      },
    };
  }, {});
});
