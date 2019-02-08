import React, { Component } from 'react';
import oFetch from 'o-fetch';
import Link from 'found/lib/Link';
import { PageWrapper } from '~/components/wrappers';
import { RoutesService } from '~/utils';

export default class InvitesHeader extends Component {
  renderFilter = filterRenderer => {
    return React.cloneElement(filterRenderer());
  };

  render() {
    const [count, filterRenderer] = oFetch(this.props, 'count', 'filterRenderer');
    return (
      <PageWrapper>
        <div className="purple-page-main__info-group">
          <h1 className="purple-page-main__title">
            Users
            <span className="purple-page-main__title-info">{count}</span>
          </h1>
          <div className="purple-page-main__info-group-actions">
            <Link
              to={RoutesService.invitesPage()}
              className="purple-button purple-button_color_accent-primary purple-button_size_m purple-page-main__info-group-action"
            >
              <span className="purple-button__text">Manage Invites</span>
            </Link>
          </div>
        </div>
        {this.renderFilter(filterRenderer)}
      </PageWrapper>
    );
  }
}
