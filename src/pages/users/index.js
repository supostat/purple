import React, { Component } from 'react';
import { connect } from 'react-redux';
import oFetch from 'o-fetch';
import AuthorizedLayout from '~/layouts/authorized-layout';
import { getUsers, getUsersCount } from './redux/selectors';
import { DesktopUsersList, DesktopUsersItem, UsersHeader } from './components';

export class UsersPage extends Component {
  handleManageInvites = () => {
    console.log('manage invites clicked!');
  };

  render() {
    const [users, usersCount] = oFetch(this.props, 'users', 'usersCount');
    return (
      <AuthorizedLayout
        headerRenderer={() => <UsersHeader count={usersCount} onManageInvitesClick={this.handleManageInvites} />}
      >
        <DesktopUsersList users={users} itemRenderer={user => <DesktopUsersItem user={user} />} />
      </AuthorizedLayout>
    );
  }
}

const mapStateToProps = state => ({
  users: getUsers(state),
  usersCount: getUsersCount(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersPage);

export { getUsersPageData } from './redux/actions';
export { default as usersPageReducers } from './redux/reducers';
