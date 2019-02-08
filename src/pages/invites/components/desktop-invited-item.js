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
    const [inviter, onRevoke] = oFetch(this.props, 'inviter', 'onRevoke');
    const [
      id,
      email,
      roleTitle,
      venues,
      invitationStatusTitle,
      inviterFullName,
      invitedAtFormatted,
      invitationStatus,
    ] = oFetch(
      inviter,
      'id',
      'email',
      'roleTitle',
      'venues',
      'invitationStatusTitle',
      'inviterFullName',
      'invitedAtFormatted',
      'invitationStatus',
    );
    const isAccepted = invitationStatus === constants.USER_INVITE_ACCEPTED_STATUS;
    const isRevoked = invitationStatus === constants.USER_INVITE_REVOKED_STATUS;
    const isPending = invitationStatus === constants.USER_INVITE_PENDING_STATUS;

    const inviteStatusClassNames = cn('purple-indicator purple-table__label', {
      'purple-indicator_color_gray': isPending,
      'purple-indicator_color_accent-green': isAccepted,
      'purple-indicator_color_accent-red': isRevoked,
    });
    const isShowRevokeButton = !isAccepted && !isRevoked;
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
          {isShowRevokeButton && (
            <div className="purple-table__actions">
              <button
                onClick={() => onRevoke(id)}
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
