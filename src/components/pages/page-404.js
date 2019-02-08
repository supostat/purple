import React, { Component } from 'react';
import Link from 'found/lib/Link';
import wrapper from './wrapper';
import blockImage from '~/assets/images/illustration-cancel-accent-red.svg';

class Page404 extends Component {
  render() {
    return (
      <div className="purple-error purple-error_role_modal purple-error_space_m">
        <div className="purple-error__group">
          <div className="purple-error__icon">
            <img src={blockImage} alt="Error&quot;" className="purple-error__image" />
          </div>
          <div className="purple-error__info">
            <h1 className="purple-error__title">
              <span className="purple-error__title-code">404</span> Page Not Found
            </h1>
            <p className="purple-error__text">
              <span className="purple-error__text-line">
                It appears the page or resource you were looking for doesn't exist or has been moved.
              </span>
              <span className="purple-error__text-line">You should probably go back to homepage.</span>
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

export default wrapper(Page404);
