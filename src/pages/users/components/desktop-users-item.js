import React, { Component } from 'react';
import oFetch from 'o-fetch';
import cn from 'classnames';
import humanizeString from 'humanize-string';
import Link from 'found/lib/Link';

import { TableCell } from '~/components';
import * as constants from '~/constants';
import { RoutesService } from '~/utils';

export default class DesktopUsersItem extends Component {
  render() {
    const user = oFetch(this.props, 'user');
    const [id, fullName, email, status, role] = oFetch(user, 'id', 'fullName', 'email', 'status', 'role');
    const statusClassNames = cn('purple-indicator purple-table__label', {
      'purple-indicator_color_accent-green': status === constants.USER_ENABLED_STATUS,
      'purple-indicator_color_accent-red': status === constants.USER_DISABLED_STATUS,
    });
    return (
      <div className="purple-table__row">
        <TableCell>
          <p className="purple-table__text">{fullName}</p>
        </TableCell>
        <TableCell>
          <p className="purple-table__text">{email}</p>
        </TableCell>
        <TableCell>
          <div className="purple-table__text">
            <div className={statusClassNames}>
              <div className="purple-indicator__label">{constants.USER_STATUSES[status]}</div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <p className="purple-table__text">{humanizeString(role)}</p>
        </TableCell>
        <TableCell>
          <div className="purple-table__actions">
            <Link
              to={RoutesService.userProfileUrl(id)}
              className="purple-button purple-button_size_xs purple-button_border_accent-pink purple-button_icon_zoom-plus purple-table__action"
            >
              Details
            </Link>
          </div>
        </TableCell>
      </div>
    );
  }
}
