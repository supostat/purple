import React, { Component } from 'react';
import oFetch from 'o-fetch';
import DropdownButton from '../dropdown-button';

export default class UserDropdown extends Component {
  render() {
    const [fullName, onLogout] = oFetch(this.props, 'fullName', 'onLogout');
    return (
      <DropdownButton
        render={(ref, handleClick, show) => (
          <div ref={ref}>
            <button
              type="button"
              onClick={handleClick}
              className="purple-page-header__action purple-page-header__action_role_profile"
              data-dropdown="profile"
            >
              Profile
            </button>
            {show && (
              <div className="purple-page-header__dropdown purple-page-header__dropdown_role_profile purple-page-header__dropdown_state_opened">
                <nav className="purple-menu">
                  <p className="purple-menu__label purple-menu__label_role_user">{fullName}</p>
                  <button type="button" onClick={onLogout} className="purple-menu__link purple-menu__link_role_logout">
                    Logout
                  </button>
                </nav>
              </div>
            )}
          </div>
        )}
      />
    );
  }
}
