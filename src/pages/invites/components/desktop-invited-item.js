import React, { Component } from 'react';
import oFetch from 'o-fetch';
import cn from 'classnames';
import * as constants from '~/constants';

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
    const [
      email,
      roleTitle,
      venues,
      invitationStatusTitle,
      inviterFullName,
      invitedAtFormatted,
      invitationStatus,
    ] = oFetch(
      inviter,
      'email',
      'roleTitle',
      'venues',
      'invitationStatusTitle',
      'inviterFullName',
      'invitedAtFormatted',
      'invitationStatus',
    );
    const isAccepted = invitationStatus === constants.USER_INVITE_ACCEPTED_STATUS;
    const inviteStatusClassNames = cn('purple-indicator purple-table__label', {
      'purple-indicator_color_gray': invitationStatus === constants.USER_INVITE_PENDING_STATUS,
      'purple-indicator_color_accent-green': invitationStatus === constants.USER_INVITE_ACCEPTED_STATUS,
      'purple-indicator_color_accent-red': invitationStatus === constants.USER_INVITE_REVOKED_STATUS,
    });

    return (
      <div className="purple-table__row">
        <Cell>
          <p className="purple-table__text purple-table__text_adjust_wrap">{email}</p>
        </Cell>
        <Cell>
          <p className="purple-table__text">{roleTitle}</p>
        </Cell>
        <Cell>
          <p className="purple-table__text">{venues}</p>
        </Cell>
        <Cell>
          <div className="purple-table__text">
            <div className={inviteStatusClassNames}>
              <div className="purple-indicator__label">{invitationStatusTitle}</div>
            </div>
          </div>
        </Cell>
        <Cell>
          <p className="purple-table__text">{inviterFullName}</p>
        </Cell>
        <Cell>
          <p className="purple-table__text">{invitedAtFormatted}</p>
        </Cell>
        <Cell>
          {!isAccepted && (
            <div className="purple-table__actions">
              <button
                type="button"
                className="purple-button purple-button_size_xs purple-button_color_accent-red purple-button_icon_close purple-table__action"
              >
                Revoke
              </button>
            </div>
          )}
        </Cell>
      </div>
    );
  }
}
