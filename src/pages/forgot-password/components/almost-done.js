import React, { Component } from 'react';
import Link from 'found/lib/Link';

export default class AlmostDone extends Component {
  render() {
    return (
      <div className="purple-modal purple-modal_size_m-minor purple-modal_space_m">
        <div className="purple-modal__content purple-modal__content_justify_center">
          <div className="purple-modal__group">
            <h2 className="purple-modal__title purple-modal__title_size_l">
              <span className="purple-modal__title-bold">Almost Done!</span>
            </h2>
            <p className="purple-modal__subtitle">
              <span className="purple-modal__subtitle-line">A password reset link was sent to your email.</span>
              <span className="purple-modal__subtitle-line">
                If you don't get an email within a few minutes, please try again or contact{' '}
                <a href="mailto:admin@example.com" className="purple-modal__link purple-modal__link_role_inline">
                  administrator
                </a>{' '}
                if the problem persists.
              </span>
            </p>
          </div>
          <div className="purple-modal__actions">
            <Link
              to="/login"
              className="purple-button purple-button_color_accent-primary purple-button_size_l purple-modal__action"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
