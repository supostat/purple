import React, { Component } from 'react';
import { connect } from 'react-redux';
import oFetch from 'o-fetch';
import {
  getUser,
  getRolesOptions,
  venuesSelector,
  getUserHistorySelector,
  getInitialFilterData,
} from './redux/selectors';
import { openContentModal, openConfirmModal } from '~/components/modals';
import { InlineRangeFilter } from '~/components/filters';
import { PanelWithHeader } from '~/components/panels';
import { WarningContent } from '~/components/modals/content';
import { DetailsList, DetailsListItem, CollapsibleBoard } from '~/components';
import {
  UserDetailsWrapper,
  UserDetailsBlock,
  UserProfileHeader,
  PersonalDetailsForm,
  AccessDetailsForm,
  DisableForm,
} from './components';
import { HistoryItem, HistoryList } from './components/history';
import {
  updatePersonalDetailsAction,
  updateAccessDetailsAction,
  disableUserAction,
  enableUserAction,
  getUserHistoryAction,
  filterUserHistoryAction,
} from './redux/actions';
import AuthorizedLayout from '~/layouts/authorized-layout';
import * as constants from '~/constants';

export class UserProfile extends Component {
  handleEnableUser = (closeModal, userId) => {
    const enableUser = oFetch(this.props, 'enableUser');
    return enableUser(userId).then(response => {
      if (!response.error) {
        closeModal();
      }
      return response;
    });
  };

  handleDisableUser = (closeModal, values) => {
    const disableUser = oFetch(this.props, 'disableUser');
    return disableUser(values).then(response => {
      if (!response.error) {
        closeModal();
      }
      return response;
    });
  };

  handleUpdatePersonalDetails = (closeModal, values) => {
    const updatePersonalDetails = oFetch(this.props, 'updatePersonalDetails');
    return updatePersonalDetails(values).then(response => {
      if (!response.error) {
        closeModal();
      }
      return response;
    });
  };

  handleUpdateAccessDetails = (closeModal, values) => {
    const updateAccessDetails = oFetch(this.props, 'updateAccessDetails');
    return updateAccessDetails(values).then(response => {
      if (!response.error) {
        closeModal();
      }
      return response;
    });
  };

  openEditPersonalDetailsModal = user => {
    const [id, firstName, surname, email] = oFetch(user, 'id', 'firstName', 'surname', 'email');
    openContentModal({
      onSubmit: this.handleUpdatePersonalDetails,
      title: 'Edit Personal Details',
      props: {
        initialValues: {
          id,
          firstName,
          surname,
          email,
        },
      },
    })(PersonalDetailsForm);
  };

  openEditAccessDetailsModal = user => {
    const [id, role, venuesIds] = oFetch(user, 'id', 'role', 'venuesIds');
    const [rolesOptions, venuesOptions] = oFetch(this.props, 'rolesOptions', 'venues');

    openContentModal({
      onSubmit: this.handleUpdateAccessDetails,
      title: 'Edit Access Details',
      props: {
        rolesOptions,
        venuesOptions,
        initialValues: {
          id,
          role,
          venues: venuesIds,
        },
      },
    })(AccessDetailsForm);
  };

  openDisableModal = user => {
    const id = oFetch(user, 'id');
    openContentModal({
      onSubmit: this.handleDisableUser,
      title: 'Disable User',
      props: {
        initialValues: {
          id,
          neverRehire: false,
          disabledReason: null,
        },
      },
    })(DisableForm);
  };

  openEnableModal = user => {
    const id = oFetch(user, 'id');
    openConfirmModal({
      onSubmit: handleClose => this.handleEnableUser(handleClose, id),
      titleColor: 'red',
      contentTitle: 'Are you sure ?',
      title: 'Warning!',
    })(WarningContent);
  };

  render() {
    const [user, getUserHistory, userHistory, initialFilterData, filterUserHistory] = oFetch(
      this.props,
      'user',
      'getUserHistory',
      'userHistory',
      'initialFilterData',
      'filterUserHistory',
    );
    const [id, fullName, email, roleTitle, status, venues] = oFetch(
      user,
      'id',
      'fullName',
      'email',
      'roleTitle',
      'status',
      'venues',
    );
    return (
      <AuthorizedLayout
        headerRenderer={() => (
          <UserProfileHeader user={user} onEnableClick={this.openEnableModal} onDisableClick={this.openDisableModal} />
        )}
      >
        <UserDetailsWrapper>
          <UserDetailsBlock
            number="1"
            title="Personal Details"
            buttonRenderer={() => (
              <button
                onClick={() => this.openEditPersonalDetailsModal(user)}
                type="button"
                className="purple-button purple-button_color_accent-orange purple-button_icon_pencil purple-button_size_xxs purple-details__header-action"
              >
                Edit
              </button>
            )}
          >
            <DetailsList>
              <DetailsListItem title="Name" value={fullName} />
              <DetailsListItem title="Email Address" value={email} />
            </DetailsList>
          </UserDetailsBlock>
          <UserDetailsBlock
            number="2"
            title="Access Details"
            buttonRenderer={() => (
              <button
                onClick={() => this.openEditAccessDetailsModal(user)}
                type="button"
                className="purple-button purple-button_color_accent-orange purple-button_icon_pencil purple-button_size_xxs purple-details__header-action"
              >
                Edit
              </button>
            )}
          >
            <DetailsList>
              <DetailsListItem title="Role" value={roleTitle} />
              <DetailsListItem title="Venue Access" value={venues} />
            </DetailsList>
          </UserDetailsBlock>
          <UserDetailsBlock number="3" title="Account Details">
            <DetailsList>
              <DetailsListItem title="Status" value={constants.USER_STATUSES[status]} />
            </DetailsList>
          </UserDetailsBlock>
        </UserDetailsWrapper>
        <CollapsibleBoard title="Change History">
          <PanelWithHeader
            headerRenderer={() => (
              <InlineRangeFilter
                initialValues={initialFilterData}
                onSubmit={values => filterUserHistory({ userId: id, ...values })}
              />
            )}
          >
            <HistoryList
              getData={() => getUserHistory(id)}
              items={userHistory}
              itemRenderer={item => <HistoryItem history={item} />}
            />
          </PanelWithHeader>
        </CollapsibleBoard>
      </AuthorizedLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUser(state),
    rolesOptions: getRolesOptions(state),
    venues: venuesSelector(state),
    userHistory: getUserHistorySelector(state),
    initialFilterData: getInitialFilterData(state),
  };
};

const mapDispatchToProps = {
  updatePersonalDetails: updatePersonalDetailsAction,
  updateAccessDetails: updateAccessDetailsAction,
  disableUser: disableUserAction,
  enableUser: enableUserAction,
  getUserHistory: getUserHistoryAction,
  filterUserHistory: filterUserHistoryAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);

export { getUserProfilePageData } from './redux/actions';
export { default as userProfileReducer } from './redux/reducers';
