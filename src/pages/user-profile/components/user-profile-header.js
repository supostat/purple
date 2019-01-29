import React, { Component } from 'react';
import oFetch from 'o-fetch';
import { Button } from '~/components';
import { PageWrapper } from '~/components/wrappers';

export default class UserProfileHeader extends Component {
  render() {
    const [user, onDisableClick] = oFetch(this.props, 'user', 'onDisableClick');
    const fullName = oFetch(user, 'fullName');

    return (
      <PageWrapper>
        <div className="purple-page-main__info-group">
          <div className="purple-page-main__info-group-profile">
            <div className="purple-profile purple-profile_page_user-profile">
              <div className="purple-profile__service">
                <div className="purple-profile__avatar purple-profile__avatar_size_xs">
                  <div className="purple-profile__avatar-inner" />
                </div>
              </div>
              <div className="purple-profile__content">
                <div className="purple-profile__header">
                  <h2 className="purple-profile__name purple-profile__name_size_l">{fullName}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="purple-page-main__info-group-actions">
            <Button
              text="Disable"
              onClick={() => onDisableClick(user)}
              className="purple-button purple-button_color_accent-red purple-button_size_m purple-button_icon_power purple-page-main__info-group-action"
            />
          </div>
        </div>
      </PageWrapper>
    );
  }
}
