import React, { Component } from 'react';
import oFetch from 'o-fetch';

export default class DesktopUsersList extends Component {
  renderHeader = () => {
    return (
      <div className="purple-table__row purple-table__row_role_header">
        <div className="purple-table__cell purple-table__cell_role_header">Name</div>
        <div className="purple-table__cell purple-table__cell_role_header">Email</div>
        <div className="purple-table__cell purple-table__cell_role_header">Status</div>
        <div className="purple-table__cell purple-table__cell_role_header">Role</div>
        <div className="purple-table__cell purple-table__cell_role_header" />
      </div>
    );
  };

  renderList = users => {
    const itemRenderer = oFetch(this.props, 'itemRenderer');
    return users.map(user => {
      const userId = oFetch(user, 'id');
      return React.cloneElement(itemRenderer(user), {
        key: userId,
      });
    });
  };

  render() {
    const users = oFetch(this.props, 'users');
    return (
      <div className="purple-table purple-table_page_users-index purple-hidden_size_m-major">
        {this.renderHeader()}
        {this.renderList(users)}
      </div>
    );
  }
}
