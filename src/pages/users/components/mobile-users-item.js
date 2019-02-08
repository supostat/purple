import React, { Component } from 'react';
import oFetch from 'o-fetch';
import cn from 'classnames';
import humanizeString from 'humanize-string';
import Link from 'found/lib/Link';

import * as constants from '~/constants';
import { RoutesService } from '~/utils';

export default class DesktopUsersItem extends Component {
  render() {
    const user = oFetch(this.props, 'user');
    const [id, fullName, email, status, role, statusTitle] = oFetch(
      user,
      'id',
      'fullName',
      'email',
      'status',
      'role',
      'statusTitle',
    );
    const statusClassNames = cn('purple-indicator', {
      'purple-indicator_color_accent-green': status === constants.USER_ENABLED_STATUS,
      'purple-indicator_color_accent-red': status === constants.USER_DISABLED_STATUS,
    });
    return (
      <div className="purple-panel purple-panel_role_board-group purple-panel_page_users-index purple-visible_size_m-major">
        <div className="purple-panel__header">
          <div className="purple-panel__header-info">
            <h3 className="purple-panel__title purple-panel__title_icon_user purple-panel__title_adjust_wrap">
              {fullName}
            </h3>
          </div>
        </div>
        <div className="purple-panel__row">
          <div className="purple-panel__cell">
            <div className={statusClassNames}>
              <div className="purple-indicator__label">{statusTitle}</div>
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
                <p className="purple-panel__text purple-panel__text_role_primary">{humanizeString(role)}</p>
              </div>
            </div>
            <div className="purple-panel__info-item">
              <div className="purple-panel__info-key">
                <p className="purple-panel__text">Email</p>
              </div>
              <div className="purple-panel__info-value">
                <p className="purple-panel__text purple-panel__text_adjust_wrap">{email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="purple-panel__row">
          <div className="purple-panel__cell">
            <div className="purple-panel__actions">
              <Link
                to={RoutesService.userProfileUrl(id)}
                className="purple-button purple-button_size_xs purple-button_border_accent-pink purple-button_icon_zoom-plus purple-table__action"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
