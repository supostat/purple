import React, { Component } from 'react';
import Link from 'found/lib/Link';

export default class SingleHeader extends Component {
  render() {
    return (
      <header className="purple-page-header">
        <div className="purple-page-header__inner">
          <div className="purple-page-header__logo-group purple-page-header__logo-group_type_single">
            <Link to="/" className="purple-page-header__logo" activeClassName="selected">
              Purple
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
