import React, { Component } from 'react';
import Link from 'found/lib/Link';
import oFetch from 'o-fetch';

import UserDropdown from './dropdowns/user-dropdown';
import QuickMenuDropdown from './dropdowns/quick-menu-dropdown';

export default class AppHeader extends Component {
  render() {
    const [user, onLogout] = oFetch(this.props, 'user', 'onLogout');
    const [firstName, surname] = oFetch(user, 'firstName', 'surname');
    const fullName = `${firstName} ${surname}`;

    return (
      <header className="purple-page-header">
        <div className="purple-page-header__inner">
          <div className="purple-page-header__logo-group">
            <Link to="/" className="purple-page-header__logo" activeClassName="selected">
              Purple
            </Link>
          </div>
          <QuickMenuDropdown />
          <UserDropdown onLogout={onLogout} fullName={fullName} />
        </div>
      </header>
    );
  }
}
