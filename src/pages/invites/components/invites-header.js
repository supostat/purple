import React, { Component } from 'react';
import oFetch from 'o-fetch';
import { PageWrapper } from '~/components/wrappers';

export default class InvitesHeader extends Component {
  renderFilter = filterRenderer => {
    return React.cloneElement(filterRenderer());
  };

  render() {
    const [onNewInviteClick, count, filterRenderer] = oFetch(this.props, 'onNewInviteClick', 'count', 'filterRenderer');
    return (
      <PageWrapper>
        <div className="purple-page-main__info-group">
          <h1 className="purple-page-main__title">
            Invites
            <span className="purple-page-main__title-info">{count}</span>
          </h1>
          <div className="purple-page-main__info-group-actions">
            <button
              onClick={onNewInviteClick}
              type="button"
              className="purple-button purple-button_color_accent-primary purple-button_size_m purple-button_icon_plus purple-page-main__info-group-action"
            >
              <span className="purple-button__text">Invite New User</span>
            </button>
          </div>
        </div>
        {this.renderFilter(filterRenderer)}
      </PageWrapper>
    );
  }
}
