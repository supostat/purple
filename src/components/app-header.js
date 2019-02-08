import React, { Component } from 'react';
import Link from 'found/lib/Link';
import oFetch from 'o-fetch';
import { connect } from 'react-redux';
import { getAuthUser } from '~/redux/selectors';
import { userLogoutAction } from '~/redux/actions/auth-user';

import UserDropdown from './dropdowns/user-dropdown';
import QuickMenuDropdown from './dropdowns/quick-menu-dropdown';

class AppHeader extends Component {
  render() {
    const [authUser, handleUserLogout] = oFetch(this.props, 'authUser', 'handleUserLogout');

    return (
      <header className="purple-page-header">
        <div className="purple-page-header__inner">
          <div className="purple-page-header__logo-group">
            <Link to="/" className="purple-page-header__logo" activeClassName="selected">
              Purple
            </Link>
          </div>
          <QuickMenuDropdown />
          <UserDropdown onLogout={handleUserLogout} user={authUser} />
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  authUser: getAuthUser(state),
});

const mapDispatchToProps = {
  handleUserLogout: userLogoutAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppHeader);
