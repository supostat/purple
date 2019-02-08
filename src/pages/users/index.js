import React, { Component } from 'react';
import { connect } from 'react-redux';
import oFetch from 'o-fetch';
import AuthorizedLayout from '~/layouts/authorized-layout';
import { WithLoadMore } from '~/components';
import { getUsers, getPaginationData } from './redux/selectors';
import {
  DesktopUsersList,
  DesktopUsersItem,
  UsersHeader,
  Filter,
  MobileUsersItem,
  MobileUsersList,
} from './components';
import { loadMoreUsersAction, filterUsersAction } from './redux/actions';

export class UsersPage extends Component {
  render() {
    const [users, pagination, loadMoreUsers, filterUsers] = oFetch(
      this.props,
      'users',
      'pagination',
      'loadMoreUsers',
      'filterUsers',
    );
    const usersCount = oFetch(pagination, 'count');
    return (
      <AuthorizedLayout
        headerRenderer={() => (
          <UsersHeader count={usersCount} filterRenderer={() => <Filter onFilter={filterUsers} />} />
        )}
      >
        <div className="purple-board">
          <div className="purple-board__inner">
            <WithLoadMore pagination={pagination} onLoadMore={loadMoreUsers}>
              <DesktopUsersList users={users} itemRenderer={user => <DesktopUsersItem user={user} />} />
              <MobileUsersList users={users} itemRenderer={user => <MobileUsersItem user={user} />} />
            </WithLoadMore>
          </div>
        </div>
      </AuthorizedLayout>
    );
  }
}

const mapStateToProps = state => ({
  users: getUsers(state),
  pagination: getPaginationData(state),
});

const mapDispatchToProps = {
  loadMoreUsers: loadMoreUsersAction,
  filterUsers: filterUsersAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersPage);

export { getUsersPageData } from './redux/actions';
export { default as usersPageReducers } from './redux/reducers';
