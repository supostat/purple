import React, { Component } from 'react';
import oFetch from 'o-fetch';
import { PageWrapper, FilterWrapper } from '~/components/wrappers';
import UsersFilter from './users-filter';

export default class InvitesHeader extends Component {
  render() {
    const [onManageInvitesClick, count] = oFetch(this.props, 'onManageInvitesClick', 'count');
    return (
      <PageWrapper>
        <div className="purple-page-main__info-group">
          <h1 className="purple-page-main__title">
            Users
            <span className="purple-page-main__title-info">{count}</span>
          </h1>
          <div className="purple-page-main__info-group-actions">
            <button
              onClick={onManageInvitesClick}
              type="button"
              className="purple-button purple-button_color_accent-primary purple-button_size_m purple-page-main__info-group-action"
            >
              <span className="purple-button__text">Manage Invites</span>
            </button>
          </div>
        </div>
        <FilterWrapper>
          <UsersFilter />
        </FilterWrapper>
      </PageWrapper>
    );
  }
}
