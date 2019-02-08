import React, { Component } from 'react';
import Link from 'found/lib/Link';
import wrapper from './wrapper';

import lockImage from '~/assets/images/illustration-lock-accent-red.svg';

class Page403 extends Component {
  render() {
    return (
      <div className="purple-error purple-error_role_modal purple-error_space_m">
        <div className="purple-error__group">
          <div className="purple-error__icon">
            <img src={lockImage} alt="Lock" className="purple-error__image" />
          </div>
          <div className="purple-error__info">
            <h1 className="purple-error__title">
              <span className="purple-error__title-code">403</span> Forbidden
            </h1>
            <p className="purple-error__text">
              <span className="purple-error__text-line">
                The page or resource you were trying to reach is absolutely forbidden for some reason.
              </span>
              <span className="purple-error__text-line">
                Please contact
                <a href="mailto:admin@example.com" className="purple-error__text-link">
                  administrator
                </a>
                if you need any assistance.
              </span>
            </p>
            <div className="purple-error__actions">
              <Link to="/" className="purple-button purple-button_color_accent-primary purple-error__action">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default wrapper(Page403);
