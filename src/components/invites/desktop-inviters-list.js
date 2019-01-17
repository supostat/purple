import React, { Component } from 'react';
import oFetch from 'o-fetch';

function renderHeader() {
  return (
    <div className="purple-table__row purple-table__row_role_header">
      <div className="purple-table__cell purple-table__cell_role_header">Email</div>
      <div className="purple-table__cell purple-table__cell_role_header">Role</div>
      <div className="purple-table__cell purple-table__cell_role_header">Venues</div>
      <div className="purple-table__cell purple-table__cell_role_header">Status</div>
      <div className="purple-table__cell purple-table__cell_role_header">Inviter</div>
      <div className="purple-table__cell purple-table__cell_role_header">Invited At</div>
      <div className="purple-table__cell purple-table__cell_role_header" />
    </div>
  );
}

function renderInvitersList(inviters, inviterRenderer) {
  return inviters.map(inviter => {
    const id = oFetch(inviter, 'id');
    return React.cloneElement(inviterRenderer(inviter), {
      key: id,
    });
  });
}

export default class DesktopInvitersList extends Component {
  render() {
    const [inviters, inviterRenderer] = oFetch(this.props, 'inviters', 'inviterRenderer');
    return (
      <div className="purple-table purple-table_page_invites-index purple-hidden_size_m-major">
        {renderHeader()}
        {renderInvitersList(inviters, inviterRenderer)}
      </div>
    );
  }
}
