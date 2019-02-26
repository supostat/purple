import React, { Component } from 'react';
import oFetch from 'o-fetch';
import wrapper from './wrapper';
import warningImage from '~/assets/images/illustration-warning-accent-red.svg';

const { ADMIN_EMAIL } = process.env;

const mailToAdmin = `mailto:${ADMIN_EMAIL}`;

class SomethingWentWrongPage extends Component {
  handleReloadPage = () => {
    window.location.reload();
  };

  renderErrorDescription = () => {
    const data = oFetch(this.props, 'data');
    console.dir(data.message);
    if (__DEV__ && data) {
      return <div className="purple-modal__group">{data.message}</div>;
    }
    return null;
  };

  render() {
    return (
      <div className="purple-modal purple-modal_size_s-major purple-modal_space_m">
        <div className="purple-modal__content purple-modal__content_justify_center">
          <div className="purple-modal__group">
            <img src={warningImage} alt="warning" className="purple-modal__image" />
            <h2 className="purple-modal__title purple-modal__title_size_l">
              <span className="purple-modal__title-bold">Oops... Something went wrong</span>
            </h2>
            <p className="purple-modal__subtitle">
              <span className="purple-modal__subtitle">There was an error in the code on this page.</span>
              <span className="purple-modal__subtitle">
                If the problem persists please let an{' '}
                <a href={mailToAdmin} className="purple-modal__link purple-modal__link_role_inline">
                  administrator
                </a>{' '}
                know what happened so that they can relay this to the technical team.
              </span>
            </p>
          </div>
          {this.renderErrorDescription()}
          <div className="purple-modal__actions">
            <button
              className="purple-button purple-button_color_accent-primary purple-button_icon_refresh purple-button_size_l purple-modal__action"
              type="button"
              onClick={this.handleReloadPage}
            >
              <span className="purple-button__text">Reload Page</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SomethingWentWrongPage.defaultProps = {
  data: null,
};

export default wrapper(SomethingWentWrongPage);
