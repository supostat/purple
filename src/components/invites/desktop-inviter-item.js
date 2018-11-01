import React, { Component } from 'react';
import oFetch from 'o-fetch';

function Cell({ children }) {
  return (
    <div className="purple-table__cell">
      <div className="purple-table__info">{children}</div>
    </div>
  );
}

export default class DesktopInviterItem extends Component {
  render() {
    const inviter = oFetch(this.props, 'inviter');
    const [email, firstName, surname, role, venues, status, inviterName, invitedAt] = oFetch(
      inviter,
      'email',
      'firstName',
      'surname',
      'role',
      'venues',
      'status',
      'inviterName',
      'invitedAt',
    );
    return (
      <div className="purple-table__row">
        <Cell>
          <p className="purple-table__text purple-table__text_adjust_wrap">{email}</p>
        </Cell>
        <Cell>
          <p className="purple-table__text">{role}</p>
        </Cell>
        <Cell>
          <p className="purple-table__text">{venues}</p>
        </Cell>
        <Cell>
          <div className="purple-table__text">
            <div className="purple-indicator purple-indicator_color_gray purple-table__label">
              <div className="purple-indicator__label">{status}</div>
            </div>
          </div>
        </Cell>
        <Cell>
          <p className="purple-table__text">{inviterName}</p>
        </Cell>
        <Cell>
          <p className="purple-table__text">{invitedAt.toString()}</p>
        </Cell>
        <Cell>
          <div className="purple-table__actions">
            <button
              type="button"
              className="purple-button purple-button_size_xs purple-button_color_accent-red purple-button_icon_close purple-table__action"
            >
              Revoke
            </button>
          </div>
        </Cell>
      </div>
    );
  }
}
