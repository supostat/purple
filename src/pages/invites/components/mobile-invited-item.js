import React, { Component } from 'react';
import oFetch from 'o-fetch';
import cn from 'classnames';
import * as constants from '~/constants';

export default class MobileInviterItem extends Component {
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

    const inviteStatusClassNames = cn('purple-indicator', {
      'purple-indicator_color_gray': isPending,
      'purple-indicator_color_accent-green': isAccepted,
      'purple-indicator_color_accent-red': isRevoked,
    });
    const isShowRevokeButton = !isAccepted && !isRevoked;
    return (
      <div className="purple-panel purple-panel_role_board-group purple-panel_page_invites-index purple-visible_size_m-major">
        <div className="purple-panel__header">
          <div className="purple-panel__header-info">
            <h3 className="purple-panel__title purple-panel__title_icon_email purple-panel__title_adjust_wrap">
              {email}
            </h3>
          </div>
        </div>
        <div className="purple-panel__row">
          <div className="purple-panel__cell">
            <div className={inviteStatusClassNames}>
              <div className="purple-indicator__label">{invitationStatusTitle}</div>
            </div>
          </div>
        </div>
        <div className="purple-panel__row purple-panel__row_type_marked">
          <div className="purple-panel__info-list">
            <div className="purple-panel__info-item">
              <div className="purple-panel__info-key">
                <p className="purple-panel__text">Role</p>
              </div>
              <div className="purple-panel__info-value">
                <p className="purple-panel__text purple-panel__text_role_primary">{roleTitle}</p>
              </div>
            </div>
            <div className="purple-panel__info-item">
              <div className="purple-panel__info-key">
                <p className="purple-panel__text">Venues</p>
              </div>
              <div className="purple-panel__info-value">
                <p className="purple-panel__text">{venues}</p>
              </div>
            </div>
            <div className="purple-panel__info-item">
              <div className="purple-panel__info-key">
                <p className="purple-panel__text">Inviter</p>
              </div>
              <div className="purple-panel__info-value">
                <p className="purple-panel__text">{inviterFullName}</p>
              </div>
            </div>
            <div className="purple-panel__info-item">
              <div className="purple-panel__info-key">
                <p className="purple-panel__text">Invited At</p>
              </div>
              <div className="purple-panel__info-value">
                <p className="purple-panel__text">{invitedAtFormatted}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="purple-panel__row">
          <div className="purple-panel__cell">
            <div className="purple-panel__actions">
              {isShowRevokeButton && (
                <button
                  onClick={() => onRevoke(id)}
                  className="purple-button purple-button_size_xs purple-button_color_accent-red purple-button_icon_close purple-panel__action"
                  type="button"
                >
                  <span className="purple-button__text">Revoke</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
