import React, { Component } from 'react';
import { connect } from 'react-redux';
import oFetch from 'o-fetch';
import AuthorizedLayout from '~/layouts/authorized-layout';
import { WithLoadMore } from '~/components';
import { openContentModal } from '~/components/modals';
import { InvitesHeader, DesktopInvitedList, DesktopInvitedItem, CreateInvite, Filter } from './components';
import {
  getInvitedUsers,
  getInvitedUsersCount,
  getRolesOptions,
  venuesSelector,
  getInitialFilterData,
  getStatusesOptions,
  getPaginationData,
} from './redux/selectors';
import { createInviteAction, filterInvitesAction, loadMoreInvitedAction } from './redux/actions';

class InvitesPage extends Component {
  handleCreateInvite = (handleClose, values) => {
    const createInvite = oFetch(this.props, 'createInvite');
    return createInvite(values);
  };

  handleNewInviteModalOpen = () => {
    const [rolesOptions, venues] = oFetch(this.props, 'rolesOptions', 'venues');
    openContentModal({
      onSubmit: this.handleCreateInvite,
      title: 'Invite New User',
      props: {
        rolesOptions,
        venues,
      },
    })(CreateInvite);
  };

  renderFilter = () => {
    const [initialFilterData, rolesOptions, venues, invitationStatusesOptions, filterInvites] = oFetch(
      this.props,
      'initialFilterData',
      'rolesOptions',
      'venues',
      'invitationStatusesOptions',
      'filterInvites',
    );
    return (
      <Filter
        initialFilterData={initialFilterData}
        onFilter={filterInvites}
        rolesOptions={rolesOptions}
        venues={venues}
        invitationStatusesOptions={invitationStatusesOptions}
      />
    );
  };

  render() {
    const [invitedUsers, invitedUsersCount, pagination, loadMoreInvited] = oFetch(
      this.props,
      'invitedUsers',
      'invitedUsersCount',
      'pagination',
      'loadMoreInvited',
    );
    return (
      <AuthorizedLayout
        headerRenderer={() => (
          <InvitesHeader
            count={invitedUsersCount}
            onNewInviteClick={this.handleNewInviteModalOpen}
            filterRenderer={this.renderFilter}
          />
        )}
      >
        <div className="purple-board">
          <div className="purple-board__inner">
            <WithLoadMore pagination={pagination} onLoadMore={loadMoreInvited}>
              <DesktopInvitedList
                invitedUsers={invitedUsers}
                invitedRenderer={invited => <DesktopInvitedItem inviter={invited} />}
              />
            </WithLoadMore>
          </div>
        </div>
      </AuthorizedLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    invitedUsers: getInvitedUsers(state),
    invitedUsersCount: getInvitedUsersCount(state),
    rolesOptions: getRolesOptions(state),
    venues: venuesSelector(state),
    initialFilterData: getInitialFilterData(state),
    invitationStatusesOptions: getStatusesOptions(state),
    pagination: getPaginationData(state),
  };
};

const mapDispatchToProps = {
  createInvite: createInviteAction,
  filterInvites: filterInvitesAction,
  loadMoreInvited: loadMoreInvitedAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvitesPage);

export { default as invitesReducers } from './redux/reducers';
export { getInvitesPageData } from './redux/actions';
