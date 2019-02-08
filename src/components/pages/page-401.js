import React, { Component } from 'react';
import Link from 'found/lib/Link';
import wrapper from './wrapper';

import lockImage from '~/assets/images/illustration-lock-accent-red.svg';

class Page401 extends Component {
  render() {
    return (
      <div className="purple-error purple-error_role_modal purple-error_space_m">
        <div className="purple-error__group">
          <div className="purple-error__icon">
            <img src={lockImage} alt="Lock" className="purple-error__image" />
          </div>
          <div className="purple-error__info">
            <h1 className="purple-error__title">
              <span className="purple-error__title-code">401</span> Unauthorized
            </h1>
            <p className="purple-error__text">
              <span className="purple-error__text-line">You are not authorized to view this page.</span>
              <span className="purple-error__text-line">
                Please contact{' '}
                <a href="mailto:admin@example.com" className="purple-error__text-link">
                  administrator
                </a>{' '}
                and request access.
              </span>
            </p>
            <div className="purple-error__actions">
              <a href="/" className="purple-button purple-button_color_accent-primary purple-error__action">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default wrapper(Page401);
